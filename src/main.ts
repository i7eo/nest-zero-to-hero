import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 关闭整个应用的 log
    logger: false,
  })
  app.setGlobalPrefix('api/v1')
  await app.listen(3000)
}
bootstrap()
