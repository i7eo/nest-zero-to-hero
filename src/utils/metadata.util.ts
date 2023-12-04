import { SetMetadata } from '@nestjs/common'
import { isFunction } from 'lodash'
import 'reflect-metadata'

export const setMetadata = SetMetadata

export const getMetadata = <K = string, V = any>(metadataKey: K, metadataValue: V) => {
  return Reflect.getMetadata(metadataKey, metadataValue)
}

export const getClassMethods = (target: any) => {
  if (!isFunction(target)) return []
  const proto = target.prototype
  const methods = Object.getOwnPropertyNames(proto).filter((prop) => prop !== 'constructor')
  return methods
}

// export type CustomDecorator<TKey = string> = MethodDecorator &
//   ClassDecorator & {
//     KEY: TKey
//   }

// /**
//  * Decorator that assigns metadata to the class/function using the
//  * specified `key`.
//  *
//  * Requires two parameters:
//  * - `key` - a value defining the key under which the metadata is stored
//  * - `value` - metadata to be associated with `key`
//  *
//  * This metadata can be reflected using the `Reflector` class.
//  *
//  * Example: `@getMetadata('roles', ['admin'])`
//  *
//  * @see [Reflection](https://docs.nestjs.com/guards#reflection)
//  *
//  * @publicApi
//  */
// export const getMetadata = <K = string /* , V = any */>(
//   metadataKey: K,
//   // metadataValue: V,
// ): CustomDecorator<K> => {
//   const decoratorFactory = (target: object, key?: any, descriptor?: any) => {
//     if (descriptor) {
//       Reflect.getMetadata(metadataKey, descriptor.value)
//       return descriptor
//     }
//     Reflect.getMetadata(metadataKey, target)
//     return target
//   }
//   decoratorFactory.KEY = metadataKey;
//   return decoratorFactory
// }
