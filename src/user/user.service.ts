import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  create(user: User) {
    const record = this.repository.create(user)
    return this.repository.save(record)
  }

  update(id: number, user: Partial<User>) {
    return this.repository.update(id, user)
  }

  read(username: string) {
    return this.repository.findOne({ where: { username } })
  }

  delete(id: number) {
    return this.repository.delete(id)
  }

  readList() {
    return this.repository.find()
  }
}
