import { Controller, Delete, Get, Inject, LoggerService, Patch, Post } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { User } from './user.entity'
// import { ConfigService } from '@nestjs/config'

import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    private service: UserService, // private config: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {
    this.logger.log('User controller init')
  }

  @Post()
  createUser(): any {
    const user = {
      username: 'i7eo',
      password: '123456',
    } as User

    return this.service.create(user)
  }

  @Get()
  readUsers(): any {
    this.logger.log('请求 /list 成功')
    this.logger.warn('请求 /list 成功')
    this.logger.verbose('请求 /list 成功')
    this.logger.debug('请求 /list 成功')
    this.logger.error('请求 /list 成功')
    return this.service.readList()
  }

  @Get('/:id')
  readUser(): any {
    // return this.service.read(username)
    return 'hello world'
  }

  @Patch('/:id')
  updateUser(): any {
    const user = {
      username: 'i7eo1',
    } as User

    return this.service.update(1, user)
  }

  @Delete()
  deleteUser(): any {
    return this.service.delete(1)
  }

  @Get('profile')
  readProfile(): any {
    return this.service.readProfile(2)
  }

  @Get('log')
  readLog(): any {
    return this.service.readLog(2)
  }

  @Get('logs')
  readLogs(): any {
    return this.service.readLogByGroup(2)
  }

  @Get('role')
  readRole(): any {
    return this.service.readRole(2)
  }
}
