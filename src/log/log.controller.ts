import { Controller, UseGuards } from '@nestjs/common'

import { JwtGuard } from '@/guards/jwt.guard'

@Controller('log')
@UseGuards(JwtGuard)
export class LogController {}
