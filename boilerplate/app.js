import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import responseHandler from './utils/response-handler'
import errorHandler from './utils/error-handler'

const app = express()
export default app

app.use(bodyParser.json())
app.use(helmet())

// load up services
import * as services from '../src/services'
for( let name in services ) {
  services[name].setup( app )
}

// Handlers
app.use(responseHandler)
app.use(errorHandler)
