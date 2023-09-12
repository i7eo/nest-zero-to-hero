import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Log } from '../log/log.entity'
import { Role } from '../role/role.entity'

import { Profile } from './profile.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[]

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
  })
  roles: Role[]
}
