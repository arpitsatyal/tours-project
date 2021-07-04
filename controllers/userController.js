let User = require('../models/userModel')
let catchAsync = require('../utils/catchAsync')
let handlerFactory = require('./handlerFactory')
let mapUser = require('../utils/mapUser')
let { deleteFile } = require('./multerController')
let email = require('../utils/greetings_email')

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

exports.updateMe = catchAsync(async(req, res, next) => {
    // console.log('req files',req.file) 
    let toUpdate = mapUser({}, req.body)
    if(req.file) toUpdate.photo = req.file.filename
    // console.log(toUpdate)
    let currentUser = await User.findById(req.user._id)
    if(req.file) {
        if(currentUser.photo !== 'default.jpg') deleteFile('users', currentUser.photo)
    }
    let updatedUser = await User.findByIdAndUpdate(req.user._id, toUpdate, {
        new: true, runValidators: true
    })
    res.status(200).json({
        status: 'success', updatedUser
    })
})

exports.deleteMe = catchAsync(async(req, res, next) => {
   email.sendByeByeMail(req.user.name, req.user.email)
   await User.findByIdAndUpdate(req.user._id, { active: false })
    res.status(204).json({
        status: 'success', data: null
    })
})

