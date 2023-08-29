import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Log } from '@/log/log.entity'
import { Role } from '@/role/role.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[]

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
  })
  roles: Role[]
}
