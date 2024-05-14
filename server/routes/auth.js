const router = require('express').Router()

const { authMiddelware } = require('../../src/middleware/auth')
const { register, profile, login, edit, del, googleLogin } = require('../controllers/auth')


router.post('/register', register)
router.post('/login', login)
router.post('/google-login', googleLogin)

router
  .route('/')
  .get(authMiddelware(), profile)
  .put(authMiddelware(), edit)
  .delete(authMiddelware(), del)

module.exports = router