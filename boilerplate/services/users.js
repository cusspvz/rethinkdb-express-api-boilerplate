import { User } from '../../src/models'
import Service from '../builders/service'
import HttpError from '../utils/http-error'

export const Users = new Service({
  model: User,
  endpoint: '/users',
  custom: {
    async 'POST /' () {
      // Users should be created trough 'POST /auth'
      throw new HttpError(401, 'Not allowed')
    }
  }
})

export default Users
