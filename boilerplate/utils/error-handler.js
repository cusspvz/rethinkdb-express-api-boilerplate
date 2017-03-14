import HttpError from './http-error'

export default ( err, req, res, next ) => {
  let retErr
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.error(err && err.stack)
  } else if (!err.code || err.code === 500) {
    // TODO: trigger some sort of reporting mechanism
  }

  if ( ! ( err instanceof HttpError ) ) {
    retErr = new HttpError( 500, 'Internal Server Error' )
    retErr.parent = err
  } else {
    retErr = err
  }

  res.status(retErr.code).send({
    message: retErr.message
  })
}
