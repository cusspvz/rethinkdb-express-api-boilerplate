import User from '../models/user'
import Service from '../utils/service'

export const Users = new Service({
  model: User,
  endpoint: '/users',
})

export default Users
