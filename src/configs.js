const { env } = process

export const DB_HOST = env.DB_HOST || '127.0.0.1'
export const DB_PORT = env.DB_PORT || '28015'
export const DB_NAME = (env.DB_NAME || 'boilerplate') + (env.NODE_ENV === 'test' ? 'Test' : '')

export const API_PORT = env.API_PORT || 8888

export const JWT_SECRET = env.JWT_SECRET || 'YouShouldChangeThisOverEnvironmentVariable'
export const JWT_ALGORITHM = env.JWT_ALGORITHM || 'HS256'
export const JWT_ACCESS_VALIDITY = env.JWT_ACCESS_VALIDITY || '7d'
export const JWT_REFRESH_VALIDITY = env.JWT_REFRESH_VALIDITY || '30d'
