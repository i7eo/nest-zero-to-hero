import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../user/user.entity'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  path: string

  @Column()
  method: string

  @Column()
  data: string

  @Column()
  result: number // status code

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  user: User
}
