import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { createQBCondition } from '@/utils/db.utils'

import { Gender, GenderEnumValue } from './gender.entity'

@Injectable()
export class GenderService {
  constructor(@InjectRepository(Gender) private readonly repository: Repository<Gender>) {}

  create(gender: Gender) {
    const record = this.repository.create(gender)
    return this.repository.save(record)
  }

  read(query: any) {
    const { limit = 10, page = 1 } = query
    const qb = this.repository.createQueryBuilder('gender')
    const newQB = createQBCondition<Gender>(qb)

    return newQB
      .orderBy('gender.value', 'ASC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany()
  }

  readOne(value: GenderEnumValue) {
    return this.repository.findOne({ where: { value } })
  }

  async update(value: GenderEnumValue, gender: Partial<Gender>) {
    return this.repository.update(value, gender)
  }

  async delete(value: GenderEnumValue) {
    const gender = await this.readOne(value)
    return this.repository.remove(gender)
  }
}
