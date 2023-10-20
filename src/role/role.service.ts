import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { createQBCondition } from '@/utils/db.utils'

import { Role, RoleEnumValue } from './role.entity'

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly repository: Repository<Role>) {}

  create(role: Role) {
    const record = this.repository.create(role)
    return this.repository.save(record)
  }

  read(query: any) {
    const { limit = 10, page = 1 } = query
    const qb = this.repository.createQueryBuilder('role')
    const newQB = createQBCondition<Role>(qb)

    return newQB
      .orderBy('role.value', 'ASC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany()
  }

  readOne(value: RoleEnumValue) {
    return this.repository.findOne({ where: { value } })
  }

  async update(value: RoleEnumValue, role: Partial<Role>) {
    return this.repository.update(value, role)
  }

  async delete(value: RoleEnumValue) {
    const role = await this.readOne(value)
    return this.repository.remove(role)
  }
}
