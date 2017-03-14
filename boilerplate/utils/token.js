import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { JWT_SECRET, JWT_ALGORITHM, JWT_ACCESS_VALIDITY, JWT_REFRESH_VALIDITY } from '../../src/configs'
import { User } from '../../src/models'

const options = {
  algorithm: JWT_ALGORITHM,
  expiresIn: JWT_ACCESS_VALIDITY
}

export const JWT_AUTHORIZATION_REGEXP = /^JWT [0-9a-zA-Z\-\_]+\.[0-9a-zA-Z\-\_]+\.[0-9a-zA-Z\-\_]+$/

export async function decodeToken (token) {
  return jwt.verify(token, JWT_SECRET)
}

export async function generateTokens (user, client) {
  const access = await generateAccessToken(user, client)
  const refresh = await generateRefreshToken(user, client)

  return {access, refresh}
}

export async function renewAccessToken (refresh, rcvdClient) {
  const { user, client } = jwt.verify(refresh, JWT_SECRET)

  if (client != rcvdClient) {
    throw new Error( 'different client id' )
  }

  // TODO: Verify token on user's generated tokens
  const access = await generateRefreshToken(user, client)

  return access
}

// private methods
async function generateAccessToken ( user, client ) {
  // TODO: Save refresh on user's account later
  return jwt.sign({user, client}, JWT_SECRET, options)
}

async function generateRefreshToken ( user, client ) {
  // TODO: Save refresh on user's account later
  return jwt.sign({user, client}, JWT_SECRET, {...options, expiresIn: JWT_REFRESH_VALIDITY})
}
