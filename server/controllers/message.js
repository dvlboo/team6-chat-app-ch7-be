const { getMessages, createMessage, deleteMessage } = require("../services/message")

exports.getMessages = async (req, res, next) => {
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

// exports.getMessagesByUserId = async (req, res, next) => {
//   try {
//     const user_id = req?.user?.id

//     const data = await getMessagesByUserId(user_id)
//     res.status(200).json({
//       message: "Success to Get Messages",
//       data,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

exports.createMessage = async (req, res, next) => {
  try {
    const { message } = req.body
    const user_id = req?.user?.id

    if (!message || message == "") {
      return next({
        message: "Message are required!!",
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
