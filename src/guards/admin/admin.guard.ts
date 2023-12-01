import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
// import { Observable } from 'rxjs'

import { DEVELOPER_ROLE_VALUE } from '@/role/constants'
import { User } from '@/user/user.entity'
import { UserService } from '@/user/user.service'

@Injectable()
export class AdminGuard implements CanActivate {
  // 常见错误，这里用到的 service 必须要导入对应的 module
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const req = context.switchToHttp().getRequest()
    // 2. 获取请求中的用户信息进行逻辑上的判断 -> 角色判断
    console.log('user', req.user)
    if (req.user && typeof req.user.username !== 'undefined') {
      const user = (await this.userService.readOne(req.user.username)) as User
      // 3. 至少是 developer 才能继续操作
      if (user.roles?.find((role) => Number(role.value) <= Number(DEVELOPER_ROLE_VALUE))) {
        return true
      }
      return false
    }
    return false
  }
}
