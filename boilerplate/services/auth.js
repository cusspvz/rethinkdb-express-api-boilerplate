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
    'POST /register': async function (req) {
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
      const user = new User({
        ...req.body,
        auth: { password: hashPassword( password ) },
        email: { address: email, verified: false },
      })

      await user.save()

      // generate tokens
      const tokens = await generateTokens(user.id, client_id)

      return { user_id: user.id, client_id, tokens }
    },

    'POST /recover': async function (req) {
      const { body: { id, email, token, new_password } } = req
      let user = null

      if ( id ) {
        try {
          user = await User.get( id )
        } catch ( e ) {}
      }

      if ( ! user && email ) {
        try {
          user = await User.getByEmail(email)
        } catch ( e ) {}
      }

      if ( ! user ) {
        throw new HttpError(400, 'Unable to identify user')
      }

      // TODO : add token generator
    },

    'POST /login': async function (req) {
      let { body: { client_id, email, password } } = req

      if (! email || ! EmailValidator.validate(email)) {
        throw new HttpError(400, 'Invalid email address')
      }

      if (! password || typeof password != 'string' || ! password.trim()) {
        throw new HttpError(400, 'Empty password')
      } else {
        password = password.trim()
      }

      if (! client_id) {
        client_id = uuid()
      }

      try {
        const user = await User.getByEmail(email)

        if ( ! user ) {
          throw null
        }

        if (! await authenticatePassword(password, user.auth.password)) {
          throw null
        }

        const tokens = await generateTokens(user.id, client_id)

        return { user_id: user.id, client_id, tokens }
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
