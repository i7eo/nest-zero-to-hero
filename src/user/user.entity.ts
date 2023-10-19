import { AfterInsert, AfterRemove, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

import { Log } from '../log/log.entity'
import { Role } from '../role/role.entity'

import { Profile } from './profile.entity'

@Entity()
export class User {
  // @PrimaryGeneratedColumn()
  // id: number
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string

  /** 确保 usernmae 唯一 */
  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  profile: Profile

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[]

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
  })
  roles: Role[]

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @AfterInsert()
  afterInsert() {
    console.log('afterInsert', this.id, this.username)
  }

  @AfterRemove()
  afterRemove() {
    console.log('afterRemove', this.id, this.username)
  }
}
