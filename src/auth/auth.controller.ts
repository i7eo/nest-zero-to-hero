import { Body, Controller, /* HttpException, */ Post, UseFilters } from '@nestjs/common'

import { TypeormExceptionFilter } from '@/filters/typeorm-exception.filter'

import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'

@Controller('auth')
@UseFilters(TypeormExceptionFilter)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signin')
  signin(@Body() dto: AuthUserDto) {
    const { username, password } = dto
    return this.service.signin(username, password)
  }

  @Post('/signup')
  signup(@Body() dto: AuthUserDto) {
    const { username, password } = dto
    // if (!username || !password) {
    //   throw new HttpException('username or password is empty', 400)
    // }
    // TODO: 与前端共用正则校验
    return this.service.signup(username, password)
  }
}
