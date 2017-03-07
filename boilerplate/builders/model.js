import rethinkdb from 'rethinkdb'
import connector from '../database'

const DEFAULT_OPTIONS = {
  table: undefined
}

export class Model {

  constructor ( options ) {
    options = { ...DEFAULT_OPTIONS, ...options }

    const { table, custom } = this.options = options

    if ( ! table ) {
      throw new Error('A table identifier is needed')
    }

    this.table = table

    if ( typeof custom == 'object' ) {
      for ( let name in custom ) {
        if ( typeof custom[name] == 'function' ) {
          this[name] = custom[name]
        }
      }
    }

  }

  async create (data, returnData = true) {
    const conn = await connector()

    const status = await this.do.insert(data).run(conn)

    if ( returnData ) {
      const key = status.generated_keys[0]
      return await this.get(key)
    }

    return status
  }

  async get (key) {
    const conn = await connector()

    return await this.do.get(key).run(conn)
  }

  async getAll ( returnCursor ) {
    const conn = await connector()

    const cursor = await this.do.getAll().run(conn)

    return returnCursor ? cursor : await cursor.toArray()
  }

  async update (key, payload) {
    const conn = await connector()

    const res = await this.do.get(key).update(payload).run(conn)

    if( res.errors )
      throw new Error('Error while updating')

    return res
  }

  async remove (key) {
    const conn = await connector()

    return await this.do.get(key).delete().run(conn)
  }

  async removeAll () {
    const conn = await connector()

    return await this.do.delete().run(conn)
  }

  get do () {
    return rethinkdb.table( this.table )
  }
}

export default Model
