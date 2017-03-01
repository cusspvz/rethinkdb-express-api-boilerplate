// NOTICE: THIS IS AN EXAMPLE SERVICE

import { Todo } from '../models'
import Service from '../../boilerplate/builders/service'

export const Todos = new Service({
  model: Todo,
  endpoint: '/todos',

  // NOTE: hooks allow you to do things over default or custom methods
  hooks: {
    // arrow function
    'before delete': async () => console.log( 'OH NO!!!!11' ),

    // async method
    async 'before update write' ( req ) {
      if ( ! req.me ) {
        throw new Error()
      }
    },

    // using next callback
    'after create' ( req, res, next ) {
      console.log( 'created a new TODO!' )
      next()
    },

    // calling custom hook
    // check http://localhost:8888/todos/
    async 'after sunbath' () {
      console.log( 'see? I appear here because of the first custom above' )
    },
  },

  // NOTE: custom object allows you to replace default methods or insert new custom ones
  custom: {

    // check http://localhost:8888/todos/
    async 'GET /' () {
      const { hook } = this

      await hook( 'after', 'sunbath' )

      return { json: 'response' }
    },

    // check http://localhost:8888/todos/arrow
    'GET /arrow': async () => 'just responded from an arrow method!! YOLO',

  }
})

export default Todos
