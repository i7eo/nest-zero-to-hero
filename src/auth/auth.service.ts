import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'

import * as argon2 from 'argon2'

import { CreateUserDto } from '@/user/dto/create-user.dto'
import { User } from '@/user/user.entity'
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
    if (!user) {
      throw new ForbiddenException('用户不存在，请注册')
    }

    // 使用 argon2 进行 password 比较
    const isSamePassword = await argon2.verify(user.password, password)
    if (!isSamePassword) {
      throw new ForbiddenException('用户名或密码错误')
    }

    // 生成 token
    const token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
      // 这里可以设置局部过期时间一般用于 refresh token
    })
    return token

    // if (user && user.password === password) {
    //   // 生成 token
    //   const token = await this.jwtService.signAsync({
    //     sub: user.id,
    //     username: user.username,
    //     // 这里可以设置局部过期时间一般用于 refresh token
    //   })
    //   return token
    // }

    // throw new UnauthorizedException()
  }

  async signup(user: Partial<Omit<User, 'roles'>> & Pick<CreateUserDto, 'roles'>) {
    const existUser = await this.userService.readOne(user.username)
    if (existUser) {
      throw new ConflictException('用户已存在，请登录')
      // throw new ForbiddenException('用户已存在，请登录')
    }

    const newUser = await this.userService.create(user)
    return newUser
  }
}
