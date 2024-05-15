const {
  getMessages,
  createMessage,
  deleteMessage,
  getMessagesByUserId,
} = require("../repository/messages")

exports.getMessages = async () => {
  const data = await getMessages()
  return data
}

// exports.getMessagesByUserId = async (user_id) => {
//   const data = await getMessagesByUserId(user_id)
//   return data
// }

exports.createMessage = async (payload) => {
  const data = await createMessage(payload)
  return data
}

exports.deleteMessage = async (id) => {
  const data = await deleteMessage(id)
  return data
}
