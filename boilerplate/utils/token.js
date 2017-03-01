import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { JWT_SECRET, JWT_ALGORITHM, JWT_ACCESS_VALIDITY, JWT_REFRESH_VALIDITY } from '../src/configs'
import User from '../models/user'

const options = {
  algorithm: JWT_ALGORITHM,
  expiresIn: JWT_ACCESS_VALIDITY
}

const token = {
  generateTokens: async ( data, client_id ) => {
    const access_token = jwt.sign(data, JWT_SECRET, options)
    const refresh_token = jwt.sign({client_id, id: data.id}, JWT_SECRET, {...options, expiresIn: JWT_REFRESH_VALIDITY})

    return { access_token, refresh_token }
  },

  renewAccessToken: async (refresh_token, client_id) => {
    const decoded = jwt.verify(refresh_token, JWT_SECRET)

    if (client_id != decoded.client_id) {
      throw new Error( 'different client id' )
    }

    const user = await User.get(decoded.id)

    if (! user.refresh_tokens.find((item) => item.token == refresh_token) ) {
      throw new Error( 'invalid refresh token' )
    }

    const access_token = jwt.sign({id:decoded.id}, JWT_SECRET, options)

    return access_token
  }
}

export { token }
