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
