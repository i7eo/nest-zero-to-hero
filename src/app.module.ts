import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'
import * as joi from 'joi'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 不开启 global 的话需要在每个 module 中单独引入 configmodule 才能将 env 信息导入
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: joi.object({
        NODE_ENV: joi.string().valid('development', 'test', 'production').default('development'),
        DB_URL: joi.string().domain(),
        DB_HOST: joi.string().ip(),
        DB_PORT: joi.number().default(3306),
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
