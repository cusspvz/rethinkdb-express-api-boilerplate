// import jwt from 'jsonwebtoken'
// import configs from '../../src/configs'
import HttpError from '../utils/http-error'
import { decodeToken } from '../utils/token'

export default async (req) => {
  const { query: { auth_token } } = req

  if ( ! auth_token ) {
    throw new HttpError( 401, 'Please add auth_token query variable to your request' )
  }

  console.log( decodeToken( auth_token ) )

  req.token = null
  req.me = null
}
