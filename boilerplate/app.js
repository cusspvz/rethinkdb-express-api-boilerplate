import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import responseHandler from './utils/response-handler'
import errorHandler from './utils/error-handler'
import nextAsync from './utils/next-async'
import { API_CORS } from '../src/config'

const app = express()
export default app

app.use(bodyParser.json())
app.use(morgan())
app.use(helmet())

import cors from 'cors'
if ( API_CORS ) {
  app.use(cors(typeof API_CORS == 'object' ? API_CORS : {}))
}


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
