const { message, user } = require("../../models")

exports.getMessages = async () => {
  try {
    const data = await message.findAll({
      include: {
        model: user
      }
    })
    return data
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
    const data = await message.create(payload)
    return data
  } catch (error) {
    throw error
  }
}

exports.deleteMessage = async (id) => {
  try {
    const data = await message.destroy({ where: { id } })
    return data
  } catch (error) {
    throw error
  }
}

