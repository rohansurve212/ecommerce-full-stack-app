/** @format */
import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@shotengai.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Smith',
    email: 'john@shotengai.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jillian Saunders',
    email: 'jillian@shotengai.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
