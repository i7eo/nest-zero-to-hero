import { applyDecorators, UseGuards } from '@nestjs/common'

import { RoleGuard } from '@/guards/role.guard'
import { DEFAULT_ROLE_LABLE } from '@/role/constants'
import { RoleEnumLabel } from '@/role/role.entity'
import { setMetadata } from '@/utils/metadata.util'

export const CUSTOM_DECORATOR_ROLE_TOKEN = '__role.decorator__'

export function Role(roleLabels: RoleEnumLabel[] = [DEFAULT_ROLE_LABLE]) {
  console.log('🚀 ~ file: role.decorator.ts:11 ~ Role ~ roleLabels:', roleLabels)
  return applyDecorators(setMetadata(CUSTOM_DECORATOR_ROLE_TOKEN, roleLabels), UseGuards(RoleGuard))
}
