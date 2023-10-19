import { Controller, Body, Delete, Get, Inject, LoggerService, Param, Patch, Post, Query, UseFilters } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { TypeormExceptionFilter } from '@/filters/typeorm-exception.filter'

import { Role, RoleEnumValue } from './role.entity'
import { RoleService } from './role.service'

@Controller('dict/roles')
@UseFilters(TypeormExceptionFilter)
export class RoleController {
  constructor(
    private service: RoleService, // private config: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {
    this.logger.log('Role controller init')
  }

  @Post()
  createRole(@Body() dto: any): any {
    const role = dto as Role
    return this.service.create(role)
  }

  @Get()
  readRoles(@Query() query: any): any {
    return this.service.read(query)
  }

  @Get(':value')
  readRole(@Param('value') value: RoleEnumValue): any {
    return this.service.readOne(value)
  }

  @Patch(':value')
  updateRole(@Param('value') value: RoleEnumValue, @Body() dto: any): any {
    const role = dto as Role
    return this.service.update(value, role)
  }

  @Delete(':value')
  deleteRole(@Param('value') value: RoleEnumValue): any {
    return this.service.delete(value)
  }
}
