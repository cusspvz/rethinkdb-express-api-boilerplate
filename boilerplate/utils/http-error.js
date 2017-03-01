function HttpError ( code = 500, message = 'Internal Server Error' ) {
  if ( typeof code == 'string' ) {
    message = code
    code = 500
  }

  this.code = code
  this.message = message
  this.stack = (new Error( message )).stack.replace(/^Error/,'HttpError')

}

HttpError.prototype = Object.create( Error.prototype )

export default HttpError
