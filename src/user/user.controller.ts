import { Controller, Get, Post } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private service: UserService,
    private config: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    console.log(this.config.get('DB_PORT'))
    return this.service.getUsers()
  }

  @Post()
  addUser(): any {
    return this.service.addUser()
  }
}
