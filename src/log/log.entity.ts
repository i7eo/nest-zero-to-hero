import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { User } from '../user/user.entity'

@Entity()
export class Log {
  // @PrimaryGeneratedColumn()
  // id: number
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string

  @Column()
  path: string

  @Column()
  method: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @Column()
  result: number // status code

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn() // 外键一般放在附属表中
  user: User
}
