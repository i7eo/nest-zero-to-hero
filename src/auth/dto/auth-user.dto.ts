import { IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 12, {
    // $value: 当前用户传入的值
    // $property: 当前属性名
    // $target: 当前类
    // $constraint1: 最小长4
    // $constraint2: 最大长12
    message: `用户名长度必须在 $constraint1 与 $constraint2 之间，当前值为: $value`,
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 16, {
    // $value: 当前用户传入的值
    // $property: 当前属性名
    // $target: 当前类
    // $constraint1: 最小长8
    // $constraint2: 最大长16
    message: `用户名长度必须在 $constraint1 与 $constraint2 之间，当前值为: $value`,
  })
  password: string
}
