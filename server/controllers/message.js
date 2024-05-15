const {
  getMessages,
  createMessage,
  deleteMessage,
} = require("../services/message")

exports.getMessages = async (req, res) => {
  try {
    const data = await getMessages()
    res.status(200).json({
      message: "Success to Get Messages",
      data,
    })
  } catch (error) {
    next(error)
  }
}

exports.createMessage = async (req, res, next) => {
  try {
    const { message, user_id } = req.body
    if (!message || message == "") {
      return next({
        message: "Message are required!!",
        statusCode: 400,
      })
    }
    if (!user_id || user_id == "") {
      return next({
        message: "User Id are required!!",
        statusCode: 400,
      })
    }
    const data = await createMessage({ message, user_id })
    if (!data) {
      return next({
        message: "Failed to Create Message",
        statusCode: 400,
      })
    }
    res.status(200).json({
      message: "Success to Create Message",
      data,
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id || id == "") {
      return next({
        message: "Id are required!!",
        statusCode: 400,
      })
    }
    const data = await deleteMessage(id)
    if (!data) {
      return next({
        message: "Failed to Delete Message",
        statusCode: 400,
      })
    }
    res.status(200).json({
      message: "Success to Delete Message",
      data,
    })
  } catch (error) {
    next(error)
  }
}
