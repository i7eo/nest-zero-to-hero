import { Logger, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { /* utilities, WinstonModule, */ WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
// import * as winston from 'winston'
// import 'winston-daily-rotate-file'

import { AppModule } from './app.module'
import { AllExceptionFilter } from './filters/all-exception.filter'
// import { AllExceptionFilter } from './filters/all-exception.filter'

async function bootstrap() {
  // 移动至 log module
  // const logger = WinstonModule.createLogger({
  //   // options of Winston
  //   transports: [
  //     new winston.transports.Console({
  //       level: 'info',
  //       format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
  //     }),
  //     new winston.transports.DailyRotateFile({
  //       dirname: 'logs',
  //       level: 'info',
  //       filename: 'app-info-%DATE%.log',
  //       datePattern: 'YYYY-MM-DD-HH',
  //       zippedArchive: true,
  //       maxSize: '20m',
  //       maxFiles: '14d',
  //       format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  //     }),
  //     new winston.transports.DailyRotateFile({
  //       dirname: 'logs',
  //       level: 'warn',
  //       filename: 'app-warn-%DATE%.log',
  //       datePattern: 'YYYY-MM-DD-HH',
  //       zippedArchive: true,
  //       maxSize: '20m',
  //       maxFiles: '14d',
  //       format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  //     }),
  //   ],
  // })

  const app = await NestFactory.create(AppModule, {
    // logger,
  })

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.setGlobalPrefix('api/v1')

  // 全局filter只能有一个
  const logger = new Logger()
  // app.useGlobalFilters(new HttpExceptionFilter(logger))
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter))

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // 去除 entity 上不存在的字段，降低新增、修改时 sql 注入的风险
    }),
  )

  // app.useGlobalGuards()
  // 弊端是：如果传入的 guard 中有使用到 service 或 module 中的方法，这样使用是获取不到的。因为这里 DI 读取不到实例
  // 可以在 app.module 的 providers 中传入：
  // {
  //   provide: APP_GUARD,
  //   useClass: AdminGuard
  // }

  await app.listen(3090, async () => {
    console.log(`:==============================: App is executing, the url is ${await app.getUrl()} :==============================:`)
  })
}
bootstrap()
