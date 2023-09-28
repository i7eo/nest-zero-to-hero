import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Patch, Post, Query, UseFilters } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { TypeormExceptionFilter } from '@/filters/typeorm-exception.filter'

import { IReadUsersDto } from './dtos/read-users.dto'

import { User } from './user.entity'
// import { ConfigService } from '@nestjs/config'

import { UserService } from './user.service'

@Controller('users')
@UseFilters(TypeormExceptionFilter)
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
  readUsers(@Query() query: IReadUsersDto): any {
    // this.logger.log('请求 /list 成功')
    // this.logger.warn('请求 /list 成功')
    // this.logger.verbose('请求 /list 成功')
    // this.logger.debug('请求 /list 成功')
    // this.logger.error('请求 /list 成功')
    return this.service.read(query)
  }

  @Get(':id')
  readUser(): any {
    // return this.service.readOne(username)
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
  readUserProfile(@Param('id') id: number): any {
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
  readUserRoles(@Param('id') id: number): any {
    return this.service.readRole(id)
  }
}
