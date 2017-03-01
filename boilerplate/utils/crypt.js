import bcrypt from 'bcrypt'

const crypt = {
  hash_password: (password) => (
    new Promise( (resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        if (error)
          return reject(error)
        bcrypt.hash(password, salt, (error, hash) => {
          if (error)
            return reject(error)
          resolve(hash)
        })
      })
    })
  ),
  authenticate_password: (pass, hashed) => (
    new Promise( (resolve, reject) => {
      bcrypt.compare( pass, hashed, ( err, res ) => {
        if( err )
          return reject(err)
        resolve( res )
      })
    })
  )
}

export { crypt }
