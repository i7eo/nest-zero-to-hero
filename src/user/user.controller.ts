import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Patch, Post, Query, UseFilters, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { TypeormExceptionFilter } from '@/filters/typeorm-exception.filter'

import { AdminGuard } from '@/guards/admin/admin.guard'

import { CreateUserDto } from './dto/create-user.dto'
import { IReadUsersDto } from './dto/read-users.dto'

import { CreateUserPipe } from './pipe/create-user/create-user.pipe'
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
  createUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
    const user = dto as User
    return this.service.create(user)
  }

  @Get()
  // 1. 需要注意的是装饰器收集顺序由上到下，由左到右，但是执行顺序是由下到上，由右到左，详情可参考：https://i7eo.com/use-express-create-mini-nest
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // 2. 也可一次性传入多个 guard，在同一个guard装饰器中传入多个 guard则按照顺序依次执行
  @UseGuards(AuthGuard('jwt'), AdminGuard)
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
    // console.log('🚀 ~ file: user.controller.ts:53 ~ UserController ~ updateUser ~ dto:', dto)
    // console.log('🚀 ~ file: user.controller.ts:53 ~ UserController ~ updateUser ~ id:', id)
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
  @UseGuards(AuthGuard('jwt'))
  // @Param('id', ParseIntPipe) // 参数 <= 3 都直接这样写，大于3则需要创建 dto
  readUserProfile(
    @Param('id') id: string,
    // 这里的 req.user 是通过 authguard 中调用 validate 方法返回
    // @Req() req: any
  ): any {
    // console.log('🚀 ~ file: user.controller.ts:75 ~ UserController ~ readUserProfile ~ any:', req)
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
