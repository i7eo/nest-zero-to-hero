import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'

import { User } from './user.entity'
// import { ConfigService } from '@nestjs/config'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private service: UserService, // private config: ConfigService,
  ) {}

  @Post()
  create(): any {
    const user = {
      username: 'i7eo',
      password: '123456',
    } as User

    return this.service.create(user)
  }

  @Patch()
  update(): any {
    const user = {
      username: 'i7eo1',
    } as User

    return this.service.update(1, user)
  }

  @Get()
  read(username: string): any {
    return this.service.read(username)
  }

  @Delete()
  delete(): any {
    return this.service.delete(1)
  }

  @Get('list')
  readList(): any {
    return this.service.readList()
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
