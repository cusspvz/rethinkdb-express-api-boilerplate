import HttpError from './http-error'

export default ( method ) => (
  async ( req, res, next ) => {
    let next_called = false
    let data

    try {
      data = await method( req, res, ( data ) => {
        next_called = true

        res.last_data = data
        next()
      })
    } catch ( err ) {

      // In case it is an httpError as we are expecting it to be
      if ( err instanceof HttpError ) {
        next( err )

      // In case error isnt httpError
      } else {
        // Show it on development
        if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ) {
          next( err )
        } else {
          // but don't on other envs
          next( new HttpError() )
        }
      }

      return
    }

    if ( ! next_called ) {
      res.last_data = data
      next()
    }
  }
)
