import { NestFactory /* , HttpAdapterHost */ } from '@nestjs/core'
import { /* utilities, WinstonModule, */ WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
// import * as winston from 'winston'
// import 'winston-daily-rotate-file'

import { AppModule } from './app.module'
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

  // // 全局filter只能有一个
  // // app.useGlobalFilters(new HttpExceptionFilter(logger))
  // const httpAdapter = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter))

  await app.listen(3000, async () => {
    console.log(`:==============================: App is executing, the url is ${await app.getUrl()} :==============================:`)
  })
}
bootstrap()
