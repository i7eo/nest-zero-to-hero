import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class DesensitizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('DesensitizeInterceptor before')
    return next.handle().pipe(
      map((data) => {
        console.log('DesensitizeInterceptor after', data)
        return data
      }),
    )
  }
}
