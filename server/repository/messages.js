const { message } = require("../../models")

exports.getMessages = async () => {
  try {
    const data = await message.findAll()
    return data
  } catch (error) {
    throw error
  }
}

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

