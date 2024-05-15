const { message, user } = require("../../models")

exports.getMessages = async () => {
  try {
    return data = await message.findAll({
      include: {
        model: user
      }
    })
  } catch (error) {
    throw error
  }
}

// exports.getMessagesByUserId = async (user_id) => {
//   try {
//     const data = await message.findAll({ where: { user_id } })
//     return data
//   } catch (error) {
//     throw error
//   }
// }

exports.createMessage = async (payload) => {
  try {
    return data = await message.create(payload)
  } catch (error) {
    throw error
  }
}

exports.deleteMessage = async (id) => {
  try {
    return data = await message.destroy({ where: { id } })
  } catch (error) {
    throw error
  }
}

