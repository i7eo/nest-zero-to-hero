import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Role } from '@/role/role.entity'

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  path: string

  @Column()
  order: number

  // create/read/update/delete/manage
  @Column()
  acl: string

  @ManyToMany(() => Role, (role) => role.menu)
  @JoinTable({
    name: 'role_menu',
  })
  role: Role
}
