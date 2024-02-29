import { GenderEnumValue } from '@/gender/gender.entity'
import { RoleEnumValue } from '@/role/role.entity'
import { IPaginationOptions } from '@/typings'

export interface IReadUsersDto extends IPaginationOptions {
  username: string
  role: RoleEnumValue // 下拉框
  gender: GenderEnumValue
}
