import { UseGuards } from '@nestjs/common'

import { RoleGuard } from '@/guards/role.guard'
import { DEFAULT_ROLE_LABLE } from '@/role/constants'
import { RoleEnumLabel } from '@/role/role.entity'
import { getClassMethods, getMetadata, setMetadata } from '@/utils/metadata.util'

type Action = 'extends' | 'rewrite'

export const CUSTOM_DECORATOR_ROLE_TOKEN = '__role.decorator__'

// export function Role(roleLabels: RoleEnumLabel[] = [DEFAULT_ROLE_LABLE]) {
//   console.log('🚀 ~ file: role.decorator.ts:11 ~ Role ~ roleLabels:', roleLabels)
//   return applyDecorators(setMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, roleLabels), UseGuards(RoleGuard))
// }

function RoleDecorator(roleLabels: RoleEnumLabel[], action: Action, target: any, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) {
  if (action === 'extends') {
    const previousRoleLabels = (getMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, descriptor.value) || []) as RoleEnumLabel[]
    setMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, [...previousRoleLabels, roleLabels])(target, key, descriptor)
    if (!previousRoleLabels.length) {
      UseGuards(RoleGuard)(target, key, descriptor)
    }
  } else {
    setMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, roleLabels)(target, key, descriptor)
    UseGuards(RoleGuard)(target, key, descriptor)
  }
}

export function Role(roleLabels: RoleEnumLabel[] = [DEFAULT_ROLE_LABLE], action: Action = 'extends'): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
    // if (descriptor) {
    //   extendArrayMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, roleLabels, descriptor.value)
    //   return descriptor
    // }
    // extendArrayMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, roleLabels, target)
    // return target

    if (descriptor) {
      RoleDecorator(roleLabels, action, target, key, descriptor)
    } else {
      const methodNames = getClassMethods(target)
      console.log('🚀 ~ file: role.decorator.ts:33 ~ return ~ methodNames:', methodNames)
      methodNames.forEach((methodName) => {
        RoleDecorator(roleLabels, action, target.prototype, methodName, Object.getOwnPropertyDescriptor(target.prototype, methodName))
      })
    }
  }
}
