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

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date
}
