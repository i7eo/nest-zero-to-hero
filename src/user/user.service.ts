import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// import { Log } from '@/log/log.entity'

import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>, // @InjectRepository(Log) private readonly LogRepository: Repository<Log>,
  ) {}

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

  readProfile(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    })
  }

  async readLog(id: number) {
    // const user = await this.repository.findOne({ where: { id } })
    // return this.LogRepository.find({
    //   where: {
    //     user,
    //   },
    //   relations: {
    //     user: true,
    //   },
    // })
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        logs: true,
      },
    })
  }

  async readRole(id: number) {
    return this.repository.find({
      where: {
        id,
      },
      relations: {
        roles: true,
      },
    })
  }
}
