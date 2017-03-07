import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { JWT_SECRET, JWT_ALGORITHM, JWT_ACCESS_VALIDITY, JWT_REFRESH_VALIDITY } from '../../src/configs'
import { User } from '../../src/models'

const options = {
  algorithm: JWT_ALGORITHM,
  expiresIn: JWT_ACCESS_VALIDITY
}

export async function decodeToken (token) {
  let payload

  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch ( e ) {
    throw new Error('Invalid token')
  }

  return payload
}

export async function generateTokens (data, client_id) {
  const access = jwt.sign(data, JWT_SECRET, options)
  const refresh = jwt.sign({client_id, id: data.id}, JWT_SECRET, {...options, expiresIn: JWT_REFRESH_VALIDITY})

  return {access, refresh}
}

export async function renewAccessToken (refresh, client_id) {
  const decoded = jwt.verify(refresh, JWT_SECRET)

  if (client_id != decoded.client_id) {
    throw new Error( 'different client id' )
  }

  const user = await User.get(decoded.id)

  if (! user.refreshs.find((item) => item.token == refresh) ) {
    throw new Error( 'invalid refresh token' )
  }

  const access = jwt.sign({id:decoded.id}, JWT_SECRET, options)

  return access
}
