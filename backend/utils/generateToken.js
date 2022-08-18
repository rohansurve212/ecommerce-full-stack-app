/** @format */
import jwt from 'jsonwebtoken'

//Generate JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
