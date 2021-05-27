let User = require('../models/userModel')
let catchAsync = require('../utils/catchAsync')
let handlerFactory = require('./handlerFactory')

exports.getAllUsers = catchAsync(async(req,res,next) => {
    let users = await User.find()
    res.status(200).json({
        status: 'success',
        users
    })
})

exports.getOneUser = catchAsync(async(req,res,next) => {
    res.status(200).json({
        status: 'success'
    })
})

exports.updateUser = handlerFactory.updateOne(User)

exports.deleteUser = handlerFactory.deleteOne(User)

exports.updateMe = catchAsync(async(req, res, next) => {
    let filteredBody = filterObj(req.body, 'name', 'email')
    let updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
        new: true, runValidators: true
    })
    res.status(200).json({
        status: 'success', updatedUser
    })
})

exports.deleteMe = catchAsync(async(req, res, next) => {
   await User.findByIdAndUpdate(req.user._id, { active: false })
    res.status(204).json({
        status: 'success', data: null
    })
})

let filterObj = (obj, ...allowedFields) => {
   let toSend = {}
  let reqBodyFields = Object.keys(obj)
  reqBodyFields.forEach(el => {
      if(allowedFields.includes(el)) toSend[el] = obj[el]
  })
   return toSend
}