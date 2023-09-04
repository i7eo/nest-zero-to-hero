import { ExceptionFilter, Catch, HttpException, ArgumentsHost, LoggerService } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    // host 指 nest 包装后的当前进程上下文对象，可从中获得 http/rpc/ws 等上下文对象
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    // http 状态码
    const status = exception.getStatus()

    this.logger.error(exception.message, exception.stack)

    response.status(status).json({
      code: status,
      path: request.url,
      method: request.method,
      message: exception.message || HttpException.name,
      timestamp: new Date().toISOString(),
    })
    // throw new Error('Method not implemented.');
  }
}
