import { Injectable } from '@nestjs/common'

import { UserService } from '@/user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin(username: string, password: string) {
    const users = await this.userService.read({ username } as any)
    return users
  }

  async signup(username: string, password: string) {
    const user = await this.userService.create({
      username,
      password,
    })
    return user
  }
}
