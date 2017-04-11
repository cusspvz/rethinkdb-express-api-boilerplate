import { thinky, type, r } from '../database'

export const User = thinky.createModel(
  'User',
  {
    id: type.string().uuid(4),
    name: type.string().max(255),
    email: {
      address: type.string().email(),
      verified: type.boolean().default( false ),
    },
    birthdate: type.date(),
    auth: {
      password: type.string(),
      facebook: type.string(),
      google: type.string(),
    },
    createdAt: type.date().default(r.now())
  }
)

export default User

User.getByEmail = async function ( email ) {
  const conn = await connector()

  const cursor = await r.table('users')
    .filter(r.row('email')('address').eq(email))
    .run(conn)

  const users = await cursor.toArray()
  if(users.length)
    return users[0]
  return null
}
