const { getMessages, createMessage, deleteMessage, getMessagesByUserId, } = require("../repository/messages")

exports.getMessages = async () => data = await getMessages()

// exports.getMessagesByUserId = async (user_id) => {
//   const data = await getMessagesByUserId(user_id)
//   return data
// }

exports.createMessage = async (payload) => data = await createMessage(payload)

exports.deleteMessage = async (id) => data = await deleteMessage(id)
