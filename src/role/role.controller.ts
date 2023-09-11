import { Controller } from '@nestjs/common'

@Controller('role')
export class RoleController {
  constructor() {
    console.log(123)
  }
}
