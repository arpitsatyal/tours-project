let User = require('../models/userModel')
let catchAsync = require('../utils/catchAsync')

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

exports.updateUser = catchAsync(async(req,res,next) => {
    res.status(200).json({
        status: 'success'
    })
})

exports.deleteUser =  catchAsync(async(req,res,next) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
})