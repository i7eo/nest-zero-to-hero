import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { QueryFailedError, TypeORMError } from 'typeorm'

@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    // host 指 nest 包装后的当前进程上下文对象，可从中获得 http/rpc/ws 等上下文对象
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    let code = 500
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno
    }

    response.status(500).json({
      code,
      path: request.url,
      method: request.method,
      message: exception.message,
      timestamp: new Date().toISOString(),
    })
  }
}
