const jsonwebtoken = require("jsonwebtoken")

exports.getTokenFromHeaders = (headers) => {
  const { authorization } = headers

  if (!authorization) {
    throw new Error('Need Authorized in Headers!')
  } 

  const splitedAuth = authorization.split(" ")

  if (splitedAuth.length < 2) {
    throw new Error('Unauthorized!')
  }
  if (splitedAuth[0] != 'Bearer') {
    throw new Error('Unauthorized!')
  }

  const token = splitedAuth[1]
  return token
}

exports.extractToken = (token) => decode = jsonwebtoken.verify(token, process.env.JWT_SECRET)