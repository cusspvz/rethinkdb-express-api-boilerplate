import EmailValidator from 'email-validator'
import { User } from '../../src/models'
import Service from '../builders/service'
import HttpError from '../utils/http-error'
import { hashPassword } from '../utils/password'

export const Auth = new Service({
  endpoint: '/auth',
  custom: {
    'POST /': async function create (req) {
      const { body: { email, password, name } } = req

      if (!email || !EmailValidator.validate(email)) {
        throw new HttpError(400, 'Invalid email address')
      }

      if (!password) {
        throw new HttpError(400, 'Invalid password')
      }

      if (!name) {
        throw new HttpError(400, 'Invalid name')
      }

      if (await User.getByEmail(email)) {
        throw new HttpError(400, 'Email already in use')
      }

      const hpassword = await hashPassword( password )

      // create user
      const user = await User.create({
        name,
        password: hpassword,
        email: {
          address: email,
          verified: false, // user email isn't verified
        }
      })

      return user
    },

    // Disable default methods
    'GET /': false,
    'GET /:id': false,
    'PUT /:id': false,
    'DELETE /:id': false,
  }
})

export default Auth
