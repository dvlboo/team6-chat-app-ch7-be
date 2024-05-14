const { user, message } = require('../../models')

const { uploader } = require('../../src/helper/cloudinary')

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const path = require('path')

exports.createUser = async (payload) => {
  // encrypt the pass
  payload.password = bcrypt.hashSync(payload.password, 10)

  if (payload.photo) {
    const { photo } = payload

    photo.publicId = crypto.randomBytes(16).toString('hex')

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`

    const imageUpload = await uploader(photo)
    payload.photo = imageUpload.secure_url
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

exports.updateUser = async(id, payload) => {
  const { photo } = payload
  
  if (photo) {
    photo.publicId = crypto.randomBytes(16).toString('hex')

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`

    const imageUpload = await uploader(photo)
    payload.photo = imageUpload.secure_url
  } else {
    payload.photo = ' '
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