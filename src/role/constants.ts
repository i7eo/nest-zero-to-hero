import { RoleEnum, RoleEnumLabels } from './role.entity'

export const OWNER_ROLE_VALUE = RoleEnum.owner
export const MAINTAINER_ROLE_VALUE = RoleEnum.maintainer
export const DEVELOPER_ROLE_VALUE = RoleEnum.developer

export const DEFAULT_ROLE_LABLE = RoleEnumLabels[2]
console.log('🚀 ~ file: constants.ts:8 ~ DEFAULT_ROLE_LABLE:', DEFAULT_ROLE_LABLE)
export const DEFAULT_ROLE_VALUE = RoleEnum.developer
