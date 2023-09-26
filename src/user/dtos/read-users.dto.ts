import { IPaginationOptions } from '@/typings'

export interface IReadUsersDto extends IPaginationOptions {
  username: string
  role: number // 下拉框
  gender: number
}
