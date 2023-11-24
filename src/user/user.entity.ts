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

  // cascade: true 设置在 onetoone 中比较安全，因为是一一对应的关系，删除主键对应对象后，关联的另一个对象也没必要保留
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  profile: Profile

  // cascade: true 设置在 onetomany 中比较安全，删除主键对应对象后，关联的另一个对象也没必要保留
  @OneToMany(() => Log, (log) => log.user, {
    cascade: true,
  })
  logs: Log[]

  // cascade: true 设置在 manytomany 中十分危险，删除 user 也会将关联的信息一并删除，所以这里需要设置 cascade 具体操作
  @ManyToMany(() => Role, (role) => role.users, {
    cascade: ['insert'],
  })
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
