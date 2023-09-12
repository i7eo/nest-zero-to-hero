import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { Log } from './src/log/log.entity'
import { Role } from './src/role/role.entity'
import { Profile } from './src/user/profile.entity'
import { User } from './src/user/user.entity'

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 8081,
  database: 'testdb',
  username: 'root',
  password: '123456',
  /** 同步实体至数据库 */
  synchronize: true,
  // autoLoadEntities: true,
  entities: [User, Profile, Log, Role],
  // logging: process.env.NODE_ENV === 'development' ? true : ['warn', 'error'],
  logging: ['warn', 'error'],
} as TypeOrmModuleOptions
