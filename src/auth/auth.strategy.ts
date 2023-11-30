import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly service: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: service.get<string>('AUTH_JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    console.log('auth validate')
    // add return object to req.user
    return { userId: payload.sub, username: payload.username }
  }
}
