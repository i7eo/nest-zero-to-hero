import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Log } from './log.entity'

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private readonly repository: Repository<Log>) {}

  readList() {
    return this.repository.find()
  }
}
