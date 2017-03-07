import { User } from '../../src/models'
import Service from '../builders/service'
import HttpError from '../utils/http-error'

export const Users = new Service({
  model: User,
  endpoint: '/users',
  hooks: {
    'after get read' (req, id, data) {
      delete data.password
    }
  },
  custom: {
    // Disallow REST CREATE - POST /users - Users should be created trough 'POST /auth'
    async 'POST /' () {
      throw new HttpError(401, 'Not allowed, please use /auth/register endpoint for user registration')
    }
  }
})

export default Users
