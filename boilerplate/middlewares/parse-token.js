import HttpError from '../utils/http-error'
import { JWT_AUTHORIZATION_REGEXP, decodeToken } from '../utils/token'

export default async (req) => {
  const { headers: { authorization }, query: { auth_token } } = req
  let token, payload

  if ( authorization && authorization.match( JWT_AUTHORIZATION_REGEXP ) ) {
    token = authorization.split(' ',2)[1]
  } else if ( auth_token ) {
    token = auth_token
  }

  if ( ! token ) {
    throw new HttpError( 401, 'Please add auth_token query variable to your request, or Authorization JWT header' )
  }

  try {
    payload = await decodeToken( token )
  } catch ( e ) {
    throw new HttpError( 403, 'Invalid token' )
  }

  req.token = token
  req.user_id = payload.user
  req.client_id = payload.client
}
