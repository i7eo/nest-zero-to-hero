import { Module } from '@nestjs/common'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '@/user/user.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './auth.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => ({
        secret: service.get<string>('AUTH_JWT_SECRET'),
        signOptions: {
          // 全局设置过期时间
          expiresIn: service.get<string>('AUTH_JWT_EXPIRES_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
