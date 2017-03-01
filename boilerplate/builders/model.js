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

  async create (userData) {
    const conn = await connector()

    return await this.do
      .insert(userData)
      .run(conn)
  }

  async get (id) {
    const conn = await connector()

    return await this.do
      .get(id)
      .run(conn)
  }

  async getAll () {
    const conn = await connector()

    return await this.do
      .getAll()
      .run(conn)
  }

  async update (id, payload) {
    const conn = await connector()

    const res = await this.do
      .get(id)
      .update(payload)
      .run(conn)

    if( res.errors )
      return null

    return res
  }

  async remove (id) {
    const conn = await connector()

    return await this.do
      .get(id)
      .delete()
      .run(conn)
  }

  async removeAll () {
    const conn = await connector()

    return await this.do
      .delete()
      .run(conn)
  }

  get do () {
    return rethinkdb.table( this.table )
  }
}

export default Model
