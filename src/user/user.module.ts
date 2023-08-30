import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Log } from '@/log/log.entity'

import { Profile } from './profile.entity'

import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Log])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
