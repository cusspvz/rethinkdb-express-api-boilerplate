import app from './app'
import { API_PORT } from '../src/configs'

export default app.listen(API_PORT, () => {
  console.log('Listening on port ' + API_PORT)
})
