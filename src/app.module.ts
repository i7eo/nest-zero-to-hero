import { Global, Logger, Module } from '@nestjs/common'

import { ConfigModule /* , ConfigService */ } from '@nestjs/config'
import { TypeOrmModule /* , TypeOrmModuleOptions */ } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import * as joi from 'joi'

import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { Log } from './log/log.entity'
import { LogModule } from './log/log.module'
import { typeromMysqlOptions } from './ormconfig'
// import { Role } from './role/role.entity'
import { RoleModule } from './role/role.module'
// import { Profile } from './user/profile.entity'
// import { User } from './user/user.entity'
import { UserModule } from './user/user.module'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 不开启 global 的话需要在每个 module 中单独引入 configmodule 才能将 env 信息导入
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: joi.object({
        NODE_ENV: joi.string().valid('development', 'test', 'production').default('development'),
        DB_TYPE: joi.string().valid('mysql'),
        DB_HOST: joi.string().ip(),
        // DB_PORT: joi.number().default(3306),
        DB_PORT: joi.number(),
        DB_SYNC: joi.boolean().default(false),
        DB_URL: joi.string().domain(),
        DB_DATABASE: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(typeromMysqlOptions),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (service: ConfigService) =>
    //     ({
    //       type: service.get('DB_TYPE'),
    //       host: service.get('DB_HOST'),
    //       port: service.get('DB_PORT'),
    //       database: service.get('DB_DATABASE'),
    //       username: service.get('DB_USERNAME'),
    //       password: service.get('DB_PASSWORD'),
    //       /** 同步实体至数据库 */
    //       synchronize: service.get('DB_SYNC'),
    //       autoLoadEntities: true,
    //       // entities: [User, Profile, Log, Role],
    //       // logging: process.env.NODE_ENV === 'development' ? true : ['warn', 'error'],
    //       logging: ['warn', 'error'],
    //     }) as TypeOrmModuleOptions,
    // }),
    UserModule,
    LogModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
