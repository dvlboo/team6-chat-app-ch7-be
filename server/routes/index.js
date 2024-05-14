const router = require('express').Router()

const auth = require('./auth')
const message = require('./message')

router.use('/auth', auth)
router.use('/message', message)

module.exports = router