import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
// import { Observable } from 'rxjs'

import { CUSTOM_DECORATOR_ROLE_TOKEN } from '@/decorators/role.decorator'
// import { DEVELOPER_ROLE_VALUE } from '@/role/constants'
import { RoleEnum, RoleEnumLabel } from '@/role/role.entity'
import { User } from '@/user/user.entity'
import { UserService } from '@/user/user.service'
import { getMetadata } from '@/utils/metadata.util'

@Injectable()
export class RoleGuard implements CanActivate {
  // 常见错误，这里用到的 service 必须要导入对应的 module
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const controllerRoleLables = getMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, context.getClass()) as RoleEnumLabel[]
    const roleLabels = getMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, context.getHandler()) as unknown as RoleEnumLabel[]
    console.log('🚀 ~ file: role.guard.ts:18 ~ RoleGuard ~ canActivate ~ roleLabels:', roleLabels)
    // 1. 获取请求对象
    const req = context.switchToHttp().getRequest()
    // 2. 获取请求中的用户信息进行逻辑上的判断 -> 角色判断
    console.log('🚀 ~ file: role.guard.ts:24 ~ RoleGuard ~ canActivate ~ req:', req.user)
    if (req.user && typeof req.user.username !== 'undefined') {
      const user = (await this.userService.readOne(req.user.username)) as User
      // 3. 根据 control 传入的 role 或者默认 role 进行角色判断
      if (user.roles?.filter((role) => roleLabels.some((roleLabel) => RoleEnum[roleLabel] === role.value)).length) {
        return true
      }
      console.warn('🚀 ~ file: role.guard.ts:31 ~ RoleGuard ~ canActivate', false)
      return false
    }
    console.warn('🚀 ~ file: role.guard.ts:34 ~ RoleGuard ~ canActivate', false)
    return false
  }
}
