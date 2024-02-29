import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as requestIp from 'request-ip'
import { QueryFailedError } from 'typeorm'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const { headers, query, body, params } = request
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal Server Error'

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus()
      message = (exception.getResponse() as any).message ?? HttpException.name

      // // 参数校验错误，默认都是BadRequestException
      // const isArrayMessage = Array.isArray(results.message);
      // const isValidationError =
      //     isArrayMessage && typeof results.message[0] === "string" && results.message[0].includes("⓿");
      // if (exception instanceof BadRequestException && isValidationError) {
      //     const validateMessage: ValidateErrorMessage = [];
      //     results.message.forEach((item) => {
      //         const [key, val] = item.split("⓿") as [string, string];
      //         const findData = validateMessage.find((item) => item.field === key);
      //         if (findData) {
      //             findData.message.push(val);
      //         } else {
      //             validateMessage.push({ field: key, message: [val] });
      //         }
      //     });
      //     message = validateMessage;
      // }
    } else if (exception instanceof QueryFailedError) {
      httpStatus = exception.driverError.errno
      // TODO: 统一处理 typeorm error
      if (exception.message) {
        message = exception.message
      }

      // if (exception.driverError.errno && exception.driverError.errno === 1062) {
      //   message = '唯一索引冲突'
      // }
    } else {
      if (exception.message) {
        message = exception.message
      }
    }

    const responseBody = {
      path: request.url,
      // IP信息
      ip: requestIp.getClientIp(request),
      // TODO: 还可以加入一些用户信息
      headers,
      query,
      params,
      body,
      exceptioin: exception.name,
      error: message,
      timestamp: new Date().toISOString(),
    }

    this.logger.error('[App]', responseBody)
    httpAdapter.reply(response, responseBody, httpStatus)
  }
}
