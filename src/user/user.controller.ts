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
  /**
   * update 注意事项：
   * 1. 权限1：判断用户是否为自己
   * 2. 权限2：判断用户是否有更新权限
   * 3. 返回数据：不能包含敏感信息（密码）
   */
  updateUser(@Param('id') id: string, @Body() dto: any): any {
    console.log('🚀 ~ file: user.controller.ts:53 ~ UserController ~ updateUser ~ dto:', dto)
    console.log('🚀 ~ file: user.controller.ts:53 ~ UserController ~ updateUser ~ id:', id)
    const user = dto as User
    return this.service.update(id, user)
  }

  @Delete(':id')
  /**
   * delete 注意事项：
   * 1. 权限1：判断用户是否有删除权限
   */
  deleteUser(@Param('id') id: string): any {
    return this.service.delete(id)
  }

  @Get(':id/profile')
  readUserProfile(@Param('id') id: string): any {
    return this.service.readProfile(id)
  }

  @Get(':id/logs')
  readLogs(@Param('id') id: string): any {
    return this.service.readLog(id)
  }

  // @Get('logs')
  // readLogs(): any {
  //   return this.service.readLogByGroup(2)
  // }

  @Get(':id/roles')
  readUserRoles(@Param('id') id: string): any {
    return this.service.readRole(id)
  }
}
