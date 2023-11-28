// import { RoleModule } from '@/role/role.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Role } from '@/role/role.entity'

import { Log } from '../log/log.entity'

import { Profile } from './profile.entity'

import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Log, Role])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
