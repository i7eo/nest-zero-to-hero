import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { createQBCondition } from '@/utils/db.utils'

import { Log } from '../log/log.entity'

import { IReadUsersDto } from './dtos/read-users.dto'

import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ) {}

  create(user: User) {
    const record = this.repository.create(user)
    return this.repository.save(record)
  }

  read(query: IReadUsersDto) {
    const { limit = 10, page = 1, username, gender, role } = query
    // SELECT * FROM user u, profile p, role r WHERE u.id = p.uid AND u.id = r.uid AND ...
    // SELECT * FROM user u LEFT JOIN profile p ON u.id = p.uid LEFT JOIN role r ON u.id = r.uid WHERE ...
    // 分页 SQL => LIMIT 10 OFFSET 10 || take skip
    // return this.repository.find({
    //   // 通过 select 筛选属性，如果有联合查询 id 必须带
    //   select: {
    //     id: true,
    //     username: true,
    //   },
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    //   take: limit,
    //   skip: (page - 1) * limit,
    // })

    // getRawMany 扁平化嵌套结构
    const qb = this.repository.createQueryBuilder('user').leftJoinAndSelect('user.profile', 'profile').leftJoinAndSelect('user.roles', 'roles')

    // if (username) {
    //   qb.where('user.username = :username', { username })
    // } else {
    //   qb.where('user.username IS NOT NULL')
    // }

    // if (gender) {
    //   // where 只能 andwhere 如果还是用 where 则前一个 where 会被覆盖
    //   qb.andWhere('profile.gender = :gender', { gender })
    // } else {
    //   qb.andWhere('profile.gender IS NOT NULL')
    // }

    // if (role) {
    //   qb.andWhere('roles.id = :role', { role })
    // } else {
    //   qb.andWhere('roles.id IS NOT NULL')
    // }

    // 避免 if/if 多重判断
    const newQB = createQBCondition<User>(qb, {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    })

    return newQB
      .take(limit)
      .skip((page - 1) * limit)
      .getMany()
  }

  readOne(username: string) {
    return this.repository.findOne({ where: { username } })
  }

  update(id: number, user: Partial<User>) {
    return this.repository.update(id, user)
  }

  delete(id: number) {
    return this.repository.delete(id)
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
    // return this.logRepository.find({
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

  readLogByGroup(id: number) {
    // return (
    //   this.logRepository.createQueryBuilder('log')
    //     .select('log.result', 'result')
    //     .addSelect('COUNT("log.result")', 'count')
    //     .leftJoinAndSelect('log.user', 'user')
    //     .where('user.id = :id', { id })
    //     .groupBy('log.result')
    //     // .orderBy('result', 'DESC')
    //     .orderBy('count', 'DESC')
    //     .addOrderBy('result', 'DESC')
    //     .getRawMany()
    // )

    // 使用原生 sql
    return this.logRepository.query(`SELECT log.result, COUNT(log.result) as count from log, user WHERE user.id = log.userId AND user.id = ${id} GROUP BY log.result`)
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
