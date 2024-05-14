const router = require("express").Router()

const { authMiddelware } = require("../../src/middleware/auth")
const { getMessages, createMessage, deleteMessage } = require("../controllers/message")

router
  .route("/")
  .get(authMiddelware(), getMessages)
  .post(authMiddelware(), createMessage)

router.route("/:id").delete(authMiddelware(), deleteMessage)

module.exports = router
