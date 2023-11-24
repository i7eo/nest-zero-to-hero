import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { User } from './user.entity'

@Entity()
export class Profile {
  // @PrimaryGeneratedColumn()
  // id: number
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string

  @Column()
  // 对应字典表的 value
  gender: string

  // 字典表不需要外键
  // @OneToOne(() => Gender, (gender) => gender.profile, {
  //   cascade: true,
  // })
  // gender: string

  @Column()
  avator: string

  @Column()
  email: string

  @Column()
  address: string

  // @OneToOne(() => User, (user) => user.profile, { cascade: true })
  // 为什么不能再双边关系都设置 cascade: true，因为会陷入循环调用，建议在主键方设置就行，关联方只能设置明确的 cascade 行为
  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date
}
