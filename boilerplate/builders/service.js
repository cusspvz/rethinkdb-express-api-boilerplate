import { Router } from 'express'
import nextAsync from '../utils/next-async'

const DEFAULT_OPTIONS = {
  model: undefined,
}

const METHODS = [ 'all', 'options', 'get', 'put', 'post', 'delete' ]

export default class Service {

  constructor ( options ) {
    options = this.options = { ...DEFAULT_OPTIONS, ...options }

    const { model, endpoint } = options

    if ( ! endpoint ) {
      throw new Error('An endpoint is needed')
    }

    if ( model ) {
      this.model = model
    }

    if ( typeof options.custom == 'object' ) {
      for ( let name in options.custom ) {
        if ( typeof options.custom[name] == 'function' ) {
          this[name] = options.custom[name]
        }
      }
    }

    this.hooks = typeof options.hooks == 'object' && options.hooks || {}
    this.middlewares = typeof options.middlewares == 'object' && options.middlewares || []
  }

  // Begin of default methods

  'GET /' = async ( /* req */ ) => {
    const { model } = this

    // TODO:
    // - Handle pagination?
    // - Handle sorting?
    // - Handle search?

    return await model.getAll()
  }

  'POST /' = async ( req ) => {
    const { body } = req
    const { model } = this

    // TODO: Handle id
    await model.create( body )
  }

  'GET /:id' = async ( req ) => {
    const { params: { id } } = req
    const { model, hook } = this

    await hook( 'before', 'get read', req, id )
    const data = await model.get(id)
    await hook( 'after', 'get read', req, id, data )

    return data
  }

  'PUT /:id' = async ( req ) => {
    const { params: { id }, body } = req
    const { model, hook } = this

    let doc

    await hook( 'before', 'update read', req, id )
    doc = await model.get( id )
    await hook( 'after', 'update read', req, doc )

    await hook( 'before', 'update write', req, body )
    doc = await model.update( id, body )
    await hook( 'after', 'update write', req, body )

    return doc
  }

  'DELETE /:id' = async ( req ) => {
    const { params: { id } } = req
    const { model, hook } = this

    await hook( 'before', 'delete', req )
    await model.remove( id )
    await hook( 'after', 'delete', req )

  }

  // End of default methods

  hook = async ( when, action, ...args ) => {
    const { hooks } = this

    const runningFor = `${when} ${action}`

    if ( hooks && typeof hooks[runningFor] == 'function' ) {
      await hooks[runningFor].apply( this, args )
    }

    // Save it for later, to allow multiple hooks
    // for ( let hookName in hooks ) {
    //   if ( hookName !== runningFor ) continue
    //
    //   await hooks[hookName].apply( this, args )
    // }
  }

  setup ( app ) {
    const { options: { endpoint }, middlewares } = this

    if ( this.router ) {
      throw new Error( 'Service was already configured' )
    }

    const router = this.router = new Router()

    for ( let middleware of middlewares ) {
      router.use( nextAsync( middleware ) )
    }

    for ( let methodName in this ) {
      if ( typeof this[methodName] != 'function' ) {
        continue
      }

      const methodAPI = methodName.split(' ')

      if ( methodAPI.length < 2 ) {
        continue
      }

      const method = methodAPI.splice(0,1)[0].toLowerCase()

      if ( ! METHODS.includes( method ) ) {
        continue
      }

      const path = methodAPI.splice(0,1)[0]

      console.log( `[${endpoint}] - setting up: ${method} ${path}`)
      router[method].call( router, path,
        nextAsync( this[methodName].bind( this ) )
      )
    }

    app.use( endpoint, router )

    console.log( `[${endpoint}] - setup completed` )
  }
}
