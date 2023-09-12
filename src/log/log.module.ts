import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'

import { LogController } from './log.controller'
import { Log } from './log.entity'
import { LogService } from './log.service'

function createDailyTransport(level: string) {
  return new winston.transports.DailyRotateFile({
    dirname: 'logs',
    level,
    filename: `app-${level}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  })
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (service: ConfigService) => {
        const enable = service.get('LOG_ENABLE')
        const level = service.get('LOG_LEVEL')
        const consoleTransport = new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
        })
        // 放在内部无论 LOG_ENABLE 为什么都会生成 logs 文件夹，因为只要 new winston.transports.DailyRotateFile 使用了 new 都会创建文件夹。所以提出去
        // const dailyTransport = new winston.transports.DailyRotateFile({
        //   dirname: 'logs',
        //   level,
        //   filename: `app-${level}-%DATE%.log`,
        //   datePattern: 'YYYY-MM-DD-HH',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        //   format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
        // })

        return {
          transports: [consoleTransport, ...(enable ? [createDailyTransport(level)] : [])],
        } as WinstonModuleOptions
      },
    }),
    TypeOrmModule.forFeature([Log]),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
