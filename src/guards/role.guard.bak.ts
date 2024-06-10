import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Reflector } from '@nestjs/core'

import { CUSTOM_DECORATOR_ROLE_TOKEN } from '@/decorators/role.decorator'
import { Role } from '@/role/role.entity'
import { User } from '@/user/user.entity'
import { UserService } from '@/user/user.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // jwt => user.id => user => roles
    // getAllAndMerge => 合并 controller 中 class 与 methods 上的 metadata
    // getAllAndOverride 取最近的 metadata
    const definedRoles = this.reflector.getAllAndMerge<Role[]>(CUSTOM_DECORATOR_ROLE_TOKEN, [context.getClass(), context.getHandler()])
    console.log('🚀 ~ RoleGuard ~ canActivate ~ definedRoles:', definedRoles)

    if (!definedRoles) {
      return true
    }

    const req = context.switchToHttp().getRequest()
    if (req.user && typeof req.user.username !== 'undefined') {
      const user = (await this.userService.readOne(req.user.username)) as User
      const roleIds = user.roles.map((r) => r.id)
      return definedRoles.some((r) => roleIds.includes(r.id))
    }

    return false
  }
}
