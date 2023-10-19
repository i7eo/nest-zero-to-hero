import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GenderController } from './gender.controller'
import { Gender } from './gender.entity'
import { GenderService } from './gender.service'

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  providers: [GenderService],
  controllers: [GenderController],
})
export class GenderModule {}
