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

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const { headers, query, body, params } = request

    let msg = exception.response || 'Internal Server Error'
    // 加入更多异常错误处理
    // TODO: 统一处理 typeorm error
    if (exception instanceof QueryFailedError) {
      msg = exception.message

      // if (exception.driverError.errno && exception.driverError.errno === 1062) {
      //   msg = '唯一索引冲突'
      // }
    }

    const responseBody = {
      // 还可以加入一些用户信息
      // IP信息
      ip: requestIp.getClientIp(request),

      headers,
      query,
      params,
      body,
      exceptioin: exception.name,
      error: msg,
      timestamp: new Date().toISOString(),
    }

    this.logger.error('[App]', responseBody)
    httpAdapter.reply(response, responseBody, httpStatus)
  }
}
