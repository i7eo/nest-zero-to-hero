import { SetMetadata } from '@nestjs/common'
import 'reflect-metadata'

export const setMetadata = SetMetadata

export const getMetadata = <K = string, V = any>(metadataKey: K, metadataValue: V) => {
  return Reflect.getMetadata(metadataKey, metadataValue)
}
