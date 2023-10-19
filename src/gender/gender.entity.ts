import { Column, CreateDateColumn, Entity, PrimaryColumn, } from 'typeorm'

export enum GenderEnum {
  female = '0',
  male = '1',
}

export type GenderEnumLabel = keyof typeof GenderEnum
export const GenderEnumLabels = Object.keys(GenderEnum) as GenderEnumLabel[]

export type GenderEnumValue = `${GenderEnum}`
export const GenderEnumValues = Object.values(GenderEnum) as GenderEnumValue[]

@Entity()
export class Gender {
  // @PrimaryGeneratedColumn()
  // id: number
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string

  @Column({
    type: 'enum',
    enum: GenderEnumLabels,
  })
  label: GenderEnumLabel

  @Column({
    type: 'enum',
    enum: GenderEnumValues,
  })
  // 字典表中不能使用 id 做为 value，需要考虑如果删除（修改）一条记录后找不到对应关系
  value: GenderEnumValue

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  // 字典表不需要外键
  // @OneToOne(() => Profile, (profile) => profile.gender)
  // @JoinColumn()
  // profile: Profile
}
