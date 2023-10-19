import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Patch, Post, Query, UseFilters } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { TypeormExceptionFilter } from '@/filters/typeorm-exception.filter'

import { Gender, GenderEnumValue } from './gender.entity'
import { GenderService } from './gender.service'

@Controller('dict/genders')
@UseFilters(TypeormExceptionFilter)
export class GenderController {
  constructor(
    private service: GenderService, // private config: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {
    this.logger.log('Gender controller init')
  }

  @Post()
  createGender(@Body() dto: any): any {
    const gender = dto as Gender
    return this.service.create(gender)
  }

  @Get()
  readGenders(@Query() query: any): any {
    return this.service.read(query)
  }

  @Get(':value')
  readGender(@Param('value') value: GenderEnumValue): any {
    return this.service.readOne(value)
  }

  @Patch(':value')
  updateGender(@Param('value') value: GenderEnumValue, @Body() dto: any): any {
    const gender = dto as Gender
    return this.service.update(value, gender)
  }

  @Delete(':value')
  deleteGender(@Param('value') value: GenderEnumValue): any {
    return this.service.delete(value)
  }
}
