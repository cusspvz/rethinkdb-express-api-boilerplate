import Thinky from 'thinky'
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } from '../src/config'
const { env } = process

export const thinky = Thinky({
  host: DB_HOST,
  port: DB_PORT,
  db: DB_NAME + (env.NODE_ENV === 'test' ? '-test' : ''),

  user: DB_USER,
  pass: DB_PASS,
})

export const ready = thinky.dbReady()
export const r = thinky.r
export const type = thinky.type

export default thinky
