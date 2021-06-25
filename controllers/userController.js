let User = require('../models/userModel')
let catchAsync = require('../utils/catchAsync')
let handlerFactory = require('./handlerFactory')

exports.getAllUsers = catchAsync(async(req,res,next) => {
    let users = await User.find()
    res.status(200).json({
        status: 'success',
        result: users.length,
        users
    })
})

exports.setUserId = catchAsync(async(req, res, next) => {
    req.params.id = req.user._id
    next()
})

exports.getOneUser = handlerFactory.getOne(User)
exports.updateUser = handlerFactory.updateOne(User)
exports.deleteUser = handlerFactory.deleteOne(User)

exports.getMe = handlerFactory.getOne(User)

let filterObj = (obj, ...allowedFields) => {
    let toSend = {}
   let reqBodyFields = Object.keys(obj)
   reqBodyFields.forEach(el => {
       if(allowedFields.includes(el)) toSend[el] = obj[el]
   })
    return toSend
 }
 
exports.updateMe = catchAsync(async(req, res, next) => {
    console.log('req files',req.file)
    let filteredBody = filterObj(req.body, 'name', 'email')
    if(req.file) filteredBody.photo = req.file.filename
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

