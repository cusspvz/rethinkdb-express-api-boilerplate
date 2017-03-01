import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import responseHandler from './utils/response-handler'
import errorHandler from './utils/error-handler'
import nextAsync from './utils/next-async'

const app = express()
export default app

app.use(bodyParser.json())
app.use(helmet())

// load up middlewares
import * as middlewares from '../src/middlewares'
for( let name in middlewares ) {
  let middleware = middlewares[name]
  if ( typeof middleware == 'function' ) {
    app.use( nextAsync( middleware ) )
  }
}

// load up services
import * as services from '../src/services'
for( let name in services ) {
  const service = services[name]
  if ( service && service.setup ) {
    service.setup( app )
  }
}

// Handlers
app.use(responseHandler)
app.use(errorHandler)
