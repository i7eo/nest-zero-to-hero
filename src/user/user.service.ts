import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// import { DEFAULT_ROLE_VALUE } from '@/role/constants'

import { Role } from '@/role/role.entity'
import { createQBCondition } from '@/utils/db.utils'

import { Log } from '../log/log.entity'

import { IReadUsersDto } from './dto/read-users.dto'

import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ) {}

  async create(user: Partial<User>) {
    // console.log('🚀 ~ file: user.service.ts:21 ~ UserService ~ create ~ user:', user)

    // // 如果系统简单不想做数据字典的话，user 关联的 gender 与 roles 可以按如下方式处理：
    // if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
    //   // 查询user所有的 role
    //   user.roles = await this.roleRepository.find({
    //     where: In(user.roles),
    //   })
    // }

    // 放入 pipe 转化
    // const roleValues = (user.roles ?? [DEFAULT_ROLE_VALUE]) as unknown as Role['value'][]
    // const roles = await Promise.all(
    //   roleValues.map(async (value) => {
    //     return this.roleRepository.findOne({ where: { value } })
    //   }),
    // )

    const roles = await Promise.all(
      (user.roles as unknown as Role['value'][]).map(async (value) => {
        return this.roleRepository.findOne({ where: { value } })
      }),
    )

    // // 循环太麻烦了，借助 In 实现
    // const roles = await this.roleRepository.find({
    //   where: In(user.roles),
    // })
    const newUser = this.repository.create({ ...user, roles })
    return this.repository.save(newUser)
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
      'roles.value': role,
    })

    return newQB
      .take(limit)
      .skip((page - 1) * limit)
      .getMany()
  }

  readOne(username: string) {
    return this.repository.findOne({ where: { username } })
  }

  async update(id: string, user: Partial<User>) {
    const userWithProfile = await this.readProfile(id)
    const newuser = this.repository.merge(userWithProfile, user)
    // 联合模型更新使用 save 或者 querybuilder
    return this.repository.save(newuser)

    // 下面的更新方法只适合单模型更新，不适合有关系的模型更新
    // return this.repository.update(id, user)
  }

  // delete(id: string) {
  //   return this.repository.delete(id)
  // }

  async delete(id: string) {
    const user = await this.repository.findOne({ where: { id } })
    return this.repository.remove(user)
  }

  readProfile(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    })
  }

  async readLog(id: string) {
    // const user = await this.repository.findOne({ where: { id } })
    // return this.logRepository.find({
    //   where: {
    //     user: user.logs,
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

  async readRole(id: string) {
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
