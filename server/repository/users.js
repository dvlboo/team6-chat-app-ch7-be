const { user, message } = require('../../models')

const { uploader } = require('../../src/helper/cloudinary')

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const path = require('path')
const axios = require('axios')

exports.createUser = async (payload) => {
  // encrypt the pass
  payload.password = bcrypt.hashSync(payload.password, 10)

  const { photo } = payload

  if (photo) {
    photo.publicId = crypto.randomBytes(16).toString('hex')

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`

    const imageUpload = await uploader(photo)
    payload.photo = imageUpload.secure_url
  } else {
    payload.photo = null
  }

  // validation for picture from google login
  if (payload?.picture) {
    payload.photo = payload?.picture
  }

  return data = await user.create(payload) 
}

exports.getUserById = async (id) => {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error('Invalid user ID');
  }

  const data = await user.findOne({
    where: { id }
  });

  if (data) {
    return data;
  }

  throw new Error('User not found');
}

exports.getUserByEmail = async (email) => {

  const data = await user.findOne({
    where : { email }
  })

  if (data) {
    return data
  }

  throw new Error(`Users is Not Found`)
}

exports.getUserByGoogleEmail = async (email) => {

  const data = await user.findOne({
    where : { email }
  })

  return data
}

// get user data using access_token from google
exports.getGoogleAccessTokenData = async (accessToken) => {
  const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
  return response.data
}

exports.updateUser = async(id, payload) => {
  const { photo } = payload
  
  if (photo) {
    photo.publicId = crypto.randomBytes(16).toString('hex')

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`

    const imageUpload = await uploader(photo)
    payload.photo = imageUpload.secure_url
  } else {
    payload.photo = null
  }

  // validation for picture from google login
  if (payload?.picture) {
    payload.photo = payload?.picture
  }
  
  await user.update(payload, {
    where : { id }
  })

  return data = await user.findAll({
    where:{ id },
    include:{ model: message }
  })
}

exports.deleteUser = async(id) => {
  await user.destroy({ where: { id } })
  return null
}