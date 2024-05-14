const { createUser, getUserById, getUserByEmail, updateUser, deleteUser } = require('../repository/users')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.register = async (payload) => {
  const user = await createUser(payload)

  // biar pass ga kebaca response
  delete user?.dataValues?.password

  // create token jwt
  const jwtPayload = {id : user.id}

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn : '2h'
  })

  return data = {
    user, 
    token
  }
}

exports.profile = async (id) => {
  let data = await getUserById(id)
  if (!data) {
    throw new Error(`User is not Found`)
  }

  // delete password
  if (data?.dataValues?.password) {
    delete data?.dataValues?.password
  } else {
    delete data?.password
  }

  return data
}

exports.login = async (payload) => {
  const user = await getUserByEmail(payload.email)

  if (!user) {
    throw new Error(`User with email : ${payload.email} Not Found`)
  }
  
  const passwordMatch = await bcrypt.compare(payload.password, user?.password)

  if(!passwordMatch) {
    throw new Error (`Invalid Password`)
  }

  // create token
  const jwtPayload = {
    id : user.id
  }

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn : '2h'
  })
  
  // delete password
  user?.dataValues?.password 
    ? delete user?.dataValues?.password
    : delete user?.password

  return data = {
    user,
    token
  }
}

exports.updateUser = async (id, payload) => data = await updateUser(id, payload)

exports.deleteUser = async (id) => data = await deleteUser(id)