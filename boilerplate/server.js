import app from './app'
import { API_PORT } from '../src/config'

export default app.listen(API_PORT, () => {
  console.log('Listening on port ' + API_PORT)
})
