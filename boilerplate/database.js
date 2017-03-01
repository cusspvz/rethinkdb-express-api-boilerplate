import rethinkdb from 'rethinkdb'
import { DB_HOST, DB_PORT, DB_NAME } from '../src/configs'

let conn
const connect = async () => {
  if ( conn ) {
    return conn
  }
  conn = await rethinkdb.connect({
    host: DB_HOST,
    port: DB_PORT,
    db: DB_NAME
  })

  conn.on('error', () => conn.reconnect() )

  return conn
}
export default connect



export const setup = async () => {
  conn = await connect()

  // Create db
  try {
    await rethinkdb.dbCreate( DB_NAME ).run(conn)
  } catch(e) {
    console.warn('Database already created')
  }

  // Had to include this with require because of sync requiring
  const models = require( '../src/models' )

  for ( let name in models ) {
    let table = models[name].table
    if ( ! table ) continue
    try {
      await rethinkdb.db( DB_NAME ).tableCreate(table).run(conn)
      console.log(`Created new table ${table}`)
    } catch (e) {
      console.log(`table ${table} already created`)
    }
  }

  console.log('Database setup is completed')
}

if ( process.env.NODE_ENV === 'development' ) {
  setup()
}
