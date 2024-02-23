import pkg from '../../package.json'

export const DEFAULT_AUTH_JWT_EXPIRES_TIME = '1d'

export const DEFAULT_AUTH_JWT_SECRET = `__${pkg.name}-${pkg.version}__`
