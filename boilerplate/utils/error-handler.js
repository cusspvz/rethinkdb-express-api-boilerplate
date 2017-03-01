import HttpError from './http-error'

export default ( err, req, res, next ) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.error(err && err.stack)
  } else if (!err.code || err.code === 500) {
    // TODO: trigger some sort of reporting mechanism
  }

  if ( ! ( err instanceof HttpError ) )
    return next(err)

  res.status(err.code).send({
    message: err.message
  })
}
