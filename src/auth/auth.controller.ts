import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signin')
  signin(@Body() dto: Record<string, any>) {
    const { username, password } = dto
    return this.service.signin(username, password)
  }

  @Post('/signup')
  signup(@Body() dto: Record<string, any>) {
    const { username, password } = dto
    return this.service.signup(username, password)
  }
}
