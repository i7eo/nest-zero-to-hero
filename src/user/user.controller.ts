import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Patch, Post } from '@nestjs/common'
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
  createUser(@Body() dto: any): any {
    const user = dto as User
    return this.service.create(user)
  }

  @Get()
  getUsers(): any {
    this.logger.log('请求 /list 成功')
    this.logger.warn('请求 /list 成功')
    this.logger.verbose('请求 /list 成功')
    this.logger.debug('请求 /list 成功')
    this.logger.error('请求 /list 成功')
    return this.service.readList()
  }

  @Get(':id')
  getUser(): any {
    // return this.service.read(username)
    return 'hello world'
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() dto: any): any {
    const user = dto as User
    return this.service.update(id, user)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): any {
    return this.service.delete(id)
  }

  @Get(':id/profile')
  getUserProfile(@Param('id') id: number): any {
    return this.service.readProfile(id)
  }

  @Get(':id/logs')
  readLogs(@Param('id') id: number): any {
    return this.service.readLog(id)
  }

  // @Get('logs')
  // readLogs(): any {
  //   return this.service.readLogByGroup(2)
  // }

  @Get(':id/roles')
  getUserRoles(@Param('id') id: number): any {
    return this.service.readRole(id)
  }
}
