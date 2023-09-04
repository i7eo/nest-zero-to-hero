import { NestFactory } from '@nestjs/core'
import { utilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'

import { AppModule } from './app.module'

async function bootstrap() {
  // createLogger of Winston
  const instance = winston.createLogger({
    // options of Winston
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
      }),
      new winston.transports.DailyRotateFile({
        dirname: 'logs',
        level: 'info',
        filename: 'app-info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
      }),
      new winston.transports.DailyRotateFile({
        dirname: 'logs',
        level: 'warn',
        filename: 'app-warn-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
      }),
    ],
  })

  const app = await NestFactory.create(AppModule, {
    // // 关闭整个应用的 log
    // logger: false,
    logger: WinstonModule.createLogger({
      instance,
    }),
  })
  app.setGlobalPrefix('api/v1')
  await app.listen(3000)
}
bootstrap()
