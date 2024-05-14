const { getTokenFromHeaders, extractToken } = require("../helper/auth")
const { profile } = require("../../server/services/auth")

exports.authMiddelware = () => async (req, res, next) => {
  try {
    // get token form headers
    const token = getTokenFromHeaders(req?.headers)
  
    // extract token to get id user
    const extractedToken = extractToken(token)

    // get user detail by Id
    const user = await profile(extractedToken?.id)

    // push to request
    req.user = user

    next()
  } catch (error) {
    error.statusCode = 401
    next(error)
  }
}