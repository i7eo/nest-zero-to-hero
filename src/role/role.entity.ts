import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn } from 'typeorm'

import { User } from '../user/user.entity'

export enum RoleEnum {
  owner = '0',
  maintainer = '1',
  developer = '2',
  reporter = '3',
  custom = '4',
  guest = '5',
}

export type RoleEnumLabel = keyof typeof RoleEnum
export const RoleEnumLabels = Object.keys(RoleEnum) as RoleEnumLabel[]

export type RoleEnumValue = `${RoleEnum}`
export const RoleEnumValues = Object.values(RoleEnum) as RoleEnumValue[]

@Entity()
export class Role {
  // @PrimaryGeneratedColumn()
  // id: number
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string

  @Column({
    type: 'enum',
    enum: RoleEnumLabels,
  })
  label: RoleEnumLabel

  @Column({
    type: 'enum',
    enum: RoleEnumValues,
  })
  value: RoleEnumValue

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
