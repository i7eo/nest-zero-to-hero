import { Body, Controller, /* HttpException, */ Post, UseFilters, UseInterceptors } from '@nestjs/common'

import { TypeormExceptionFilter } from '@/filters/typeorm-exception.filter'

import { DesensitizeInterceptor } from '@/interceptors/desensitize.interceptor'

import { CreateUserPipe } from '@/user/pipe/create-user/create-user.pipe'

import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'

@Controller('auth')
@UseFilters(TypeormExceptionFilter)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: AuthUserDto) {
    const { username, password } = dto
    const token = await this.service.signin(username, password)
    return {
      access_token: token,
    }
  }

  @Post('signup')
  @UseInterceptors(DesensitizeInterceptor)
  signup(@Body(CreateUserPipe) dto: AuthUserDto) {
    // const { username, password } = dto
    // if (!username || !password) {
    //   throw new HttpException('username or password is empty', 400)
    // }
    // TODO: 与前端共用正则校验
    return this.service.signup(dto)
  }
}
