import HttpError from './http-error'

export default ( req, res /*, next*/ ) => {

  if( res.last_data ) {
    return res.send( res.last_data )
  }

  throw new HttpError(404, 'Endpoint not found')
}
