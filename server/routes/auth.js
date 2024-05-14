const router = require('express').Router()

const { authMiddelware } = require('../../src/middleware/auth')
const { register, profile, login, edit, del } = require('../controllers/auth')


router.post('/register', register)
router.post('/login', login)

router
  .route('/')
  .get(authMiddelware(), profile)
  .put(authMiddelware(), edit)
  .delete(authMiddelware(), del)

module.exports = router