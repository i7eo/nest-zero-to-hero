import 'reflect-metadata'

export function extendArrayMetadata<T extends Array<unknown>>(key: string, metadata: T, target: (...args: any) => any) {
  const previousValue = Reflect.getMetadata(key, target) || []
  const value = [...previousValue, ...metadata]
  Reflect.defineMetadata(key, value, target)
}
