import EmailValidator from 'email-validator'
import { User } from '../../src/models'
import Service from '../builders/service'
import HttpError from '../utils/http-error'
import { authenticatePassword, hashPassword } from '../utils/password'
import { generateTokens } from '../utils/token'
import uuid from 'uuid/v4'

export const Auth = new Service({
  endpoint: '/auth',
  custom: {
    'POST /register': async function create (req) {
      let { body: { email, password, name, client_id } } = req

      if (! email || ! EmailValidator.validate(email)) {
        throw new HttpError(400, 'Invalid email address')
      }

      if (! password || typeof password != 'string' || ! password.trim()) {
        throw new HttpError(400, 'Empty password')
      } else {
        password = password.trim()
      }

      if (! name) {
        throw new HttpError(400, 'Invalid name')
      }

      if (await User.getByEmail(email)) {
        throw new HttpError(400, 'Email already in use')
      }

      if (! client_id) {
        client_id = uuid()
      }

      // create user
      const user = await User.create({
        name,
        password: hashPassword( password ),
        email: {
          address: email,
          verified: false, // user email isn't verified
        }
      })

      // generate tokens
      const tokens = await generateTokens({ id: user.id }, client_id)

      return { user_id: user.id, client_id, tokens }
    },

    'POST /login': async function create (req) {
      let { body: { email, password } } = req

      if (! email || ! EmailValidator.validate(email)) {
        throw new HttpError(400, 'Invalid email address')
      }

      if (! password || typeof password != 'string' || ! password.trim()) {
        throw new HttpError(400, 'Empty password')
      } else {
        password = password.trim()
      }

      try {
        const user = await User.getByEmail(email)

        if ( ! user ) {
          throw null
        }

        if (! await authenticatePassword(password, user.password)) {
          throw null
        }

        const tokens = await token.generateToken({ id: user.id }, client_id)

        // let refresh_tokens = user.refresh_tokens || []
        //
        // // if there is a token registered for the client, update it
        // var clientFound = false
        // for(let j = 0; j < refresh_tokens.lengt; j++) {
        //   if(refresh_tokens[j].client_id === client_id) {
        //     refresh_tokens[j].token = tokens.refresh_token
        //     clientFound = true
        //   }
        // }

        // if the client is registering for the first time, add token
        // if( ! clientFound){
        //   refresh_tokens.push({
        //     token: tokens.refresh_token,
        //     client_id
        //   })
        // }

        // const dbRes = await User.update(user.id, {refresh_tokens})
        // if( ! dbRes)
        //   throw new HttpError()
        return tokens

      } catch(err) {
        throw new HttpError(403, 'Invalid email/password combination')
      }
    },



    // Disable default methods
    'POST /': false,
    'GET /': false,
    'GET /:id': false,
    'PUT /:id': false,
    'DELETE /:id': false,
  }
})

export default Auth
