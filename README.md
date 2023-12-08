# Nest Zero to Hero

> This project is a summary of the experience of learning Nestjs.

## Table of Contents

- [IOC & DI](#ioc--di)
- [Life Cycle](#life-cycle)
- [Core](#core)
- [Data Object](#data-object)
- [API Server Design](#api-server-design)
- [SQL](#sql)
- [Log Design](#log-design)
- [License](#license)

## IOC & DI

IOC 是一种思想而 DI 是 IOC 的具体实现。查看下列示例：

```typescript
class IPhone {
  play(name: string) {
    console.log(`${name} is playing on the IPhone.`)
  }
}

class Person {
  constructor(private name: string) {}

  getName() {
    return this.name
  }

  setName(name: string) {
    this.name = name
  }

  play() {
    const phone = new IPhone();
    phone.play(this.name)
  }
}

const person = new Person('i7eo')
person.play()
```

上述示例中 `IPhone` 与 `Person` 强依赖，如果需要将 `IPhone` 改为 `Huawei` 则需要修改 `Person` 代码。最佳实践是将 `IPhone` 与 `Person` 解耦，`Person` 中只需要调用 `play` 方法即可不需要关注当前是 `IPhone` 还是 `Huawei`。修改如下：

```typescript
interface Phone {
  play: (name: string) => void
}

class Huawei implements Phone {
  play(name: string) {
    console.log(`${name} is playing on the Huawei.`)
  }
}

class IPhone implements Phone {
  play(name: string) {
    console.log(`${name} is playing on the IPhone.`)
  }
}

class Person {
  constructor(
    private name: string,
    private phone: Phone,
  ) {}

  getName() {
    return this.name
  }

  setName(name: string) {
    this.name = name
  }

  play() {
    this.phone.play(this.name)
  }
}

const person1 = new Person('i7eo', new Huawei())
person1.play()

const person2 = new Person('i7eo', new IPhone())
person2.play()
```

控制反转（**I**nversion **O**f **C**ontrol）是一种面向对象编程中的设计范式，**用来降低计算机代码之间的耦合度**。其基本思想是借助第三方（有很多实现方式在 ts 中既可以使用上述方法与可以使用注解/装饰器实现）实现具有依赖关系的对象之间的解耦。

依赖注入（**D**ependency **I**njection）是一种用于实现 IOC 的设计模式它**允许在类外创建依赖对象**，并通过不同的方式将这些对象提供给类。

使用注解/装饰器（类 Nestjs）实现如下：

```typescript
import 'reflect-metadata'

type Constructor<T = any> = new (...args: any[]) => T

const Injectable = (): ClassDecorator => (_target) => {}

class IPhone {
  play() {
    console.log(`Someone is playing on the IPhone.`)
  }
}

@Injectable()
class Person {
  constructor(private phone: IPhone) {}

  play() {
    this.phone.play()
  }
}

const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target)
  // eslint-disable-next-line new-cap
  const args = providers.map((provider: Constructor) => new provider())
  // eslint-disable-next-line new-cap
  return new target(...args)
}

Factory(Person).play()
```

## Life Cycle

请查阅 [Nestjs Life Cycle](./.instruction/nest-life-cycle.md)

## Core

请查阅 [Nestjs Core](./.instruction/nest-core.md)

## Data Object

请查阅 [Nestjs Data Object](./.instruction/nest-data-object.md)

## API Server Design

请查阅 [Nestjs API Server Design](./.instruction/nest-api-server-design.md)

## SQL

请查阅 [Nestjs SQL](./.instruction/nest-sql.md)

## Log Design

请查阅 [Nestjs Log Design](./.instruction/nest-log-design.md)

## TODO

1. 挂在 controller class 上的 role 如何向每个 method 添加？

2. method 上的 role 能否覆盖 class 上的 role？

## Carefull

1. argon2: `pnpm i argon2 --unsafe-perm`，安装 python

## License

This repository is published under the [MIT](LICENSE) license.
