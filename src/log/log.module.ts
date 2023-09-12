import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'

import { LogController } from './log.controller'
import { Log } from './log.entity'
import { LogService } from './log.service'

// 放在内部无论 LOG_ENABLE 为什么都会生成 logs 文件夹这是 winston-daily-rotate-file 的 bug，只能提取出来
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
