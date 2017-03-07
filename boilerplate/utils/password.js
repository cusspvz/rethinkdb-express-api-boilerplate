import bcrypt from 'bcrypt'

export function hashPassword ( password ) {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync( password, salt )
}

export function authenticatePassword ( password, hashed ) {
  return bcrypt.compareSync( password, hashed )
}
