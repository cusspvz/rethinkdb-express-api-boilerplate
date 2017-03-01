import rethinkdb from 'rethinkdb'
import connector from '../database'
import Model from '../utils/model'

export const User = new Model ({
  table: 'users',
  custom: {
    async getByEmail (email) {
      const conn = await connector()

      const cursor = await rethinkdb.table('users')
        .filter(rethinkdb.row('email')('address').eq(email))
        .run(conn)

      const users = await cursor.toArray()
      if(users.length)
        return users[0]
      return null
    }
  }
})

export default User
