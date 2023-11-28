import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

import { isObject, isString } from 'lodash'

import { DEFAULT_ROLE_VALUE } from '@/role/constants'
import { Role } from '@/role/role.entity'
import { CreateUserDto } from '@/user/dto/create-user.dto'

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    // 这里的转化是非常必要的，尤其对于这种对象数组。后端应该做到不在乎前端传什么，只在该接口相关数据是否完整
    if (value.roles && value.roles instanceof Array && value.roles.length > 0) {
      if (value.roles[0] && isObject(value.roles[0])) {
        // handle Role[]
        value.roles = (value.roles as unknown as Role[]).map((role) => role.value)
      }

      if (value.roles[0] && isString(value.roles[0])) {
        // handle string[]
      }
    } else {
      value.roles = [DEFAULT_ROLE_VALUE]
    }

    // TODO: gender 字典数据
    return value
  }
}
