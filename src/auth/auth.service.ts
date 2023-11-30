import { Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'

import { UserService } from '@/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(username: string, password: string) {
    // const users = await this.userService.read({ username } as any)
    // return users
    const user = await this.userService.readOne(username)
    if (user && user.password === password) {
      // 生成 token
      const token = await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
        // 这里可以设置局部过期时间一般用于 refresh token
      })
      return token
    }

    throw new UnauthorizedException()
  }

  async signup(username: string, password: string) {
    const user = await this.userService.create({
      username,
      password,
    })
    return user
  }
}
