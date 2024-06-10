import * as fs from 'fs'

import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

// 通过环境变量读取不同得 .env 文件
function getEnv(env: string): Record<string, any> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env))
  }
  return {}
}

function createOptions() {
  const config = { ...getEnv('.env'), ...getEnv(`.env.${process.env.NODE_ENV || 'development'}`) }
  return {
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    /** 同步实体至数据库 */
    synchronize: config.DB_SYNC,
    // autoLoadEntities: true,
    // entities: [User, Profile, Log, Role],
    entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    logging: process.env.NODE_ENV === 'development' ? true : ['warn', 'error'],
    // logging: ['warn', 'error'],
  } as TypeOrmModuleOptions
}

// 给自己得项目用
export const typeromMysqlOptions = createOptions()

// 给 typeorm cli 做 migration 用
export default new DataSource({
  ...typeromMysqlOptions,
  migrations: ['./src/migration/**'],
  subscribers: [],
} as DataSourceOptions)
