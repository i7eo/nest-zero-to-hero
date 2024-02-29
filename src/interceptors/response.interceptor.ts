import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { hasIn } from 'lodash'
import { map, Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    const code = response.statusCode
    const message = response.statusMessage ?? HttpStatus[code]

    return next.handle().pipe(
      map((data) => {
        if (data) {
          const isFormatResult = hasIn(data, ['code', 'message', 'data'])
          if (isFormatResult) return data
        }

        return {
          code,
          message,
          data: data ?? null,
          success: true,
        }
      }),
    )
  }
}
