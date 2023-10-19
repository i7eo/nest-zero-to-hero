import { IPaginationOptions } from '@/typings'

export interface IReadUsersDto extends IPaginationOptions {
  username: string
  role: string // 下拉框
  gender: string
}
