const { register, profile, login, updateUser, deleteUser } = require("../services/auth")

exports.register = async (req, res, next) => {
  try {
    // get body
    const { name, password, email } = req.body
    // get files
    const { photo } = req.files

    if (name == "" ||!name) {
      return next({
        message : "Name Must Be Filled!",
        statusCode : 400
      })
    }
    if (password == "" ||!password) {
      return next({
        message : "Password Must Be Filled!",
        statusCode : 400
      })
    }
    if (email == "" ||!email) {
      return next({
        message : "Email Must Be Filled!",
        statusCode : 400
      })
    }

    const data = await register({
      name, password, email, photo
    })

    const response = {
      message : "Register Success",
      data
    }
    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}

exports.profile = async (req, res, next) => {
  try {
    // get user by id
    const data = await profile(req.user.id)

    res.status(200).json({
      message : "Profile Success",
      data
    })
    
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    
    if(!email || email == '' || !password || password == '') {
      return next({
        message : 'Email and Password are Required',
        statusCode: 400
      })
    }

    const data = await login({email, password})

    res.status(200).json({
      message : "Login Success",
      data
    })

  } catch (error) {
    next(error)
  }
}

exports.edit = async (req, res, next) => {
  try {
    const { id } = req.user
    const { name, email } = req.body
    const { photo } = req.files

    if (!name || name == "") {
      return next({
        message: "Name are required!!",
        statusCode : 400
      })
    }
    if (!email || email == "") {
      return next({
        message: "Email are required!!",
        statusCode : 400
      })
    }

    const data = await updateUser(id, { name, email, photo })

    res.status(200).json({
      message : "Update Success",
      data
    })

  } catch (error) {
    next(error)
  }
}

exports.del = async (req, res, next) => {
  try {
    const { id } = req.user

    const data = await deleteUser(id)

    res.status(200).json({
      message : "Deleted User Succesfully",
      data
    })
    
  } catch (error) {
    next(error)
  }
}