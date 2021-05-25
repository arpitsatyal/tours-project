let User = require('../models/userModel')
let catchAsync = require('../utils/catchAsync')
let jwt = require('jsonwebtoken')
let AppError = require('../utils/appError')

let signToken = id => jwt.sign({ id }, process.env.JWT_SECRET)

exports.signup = catchAsync(async (req, res, next) => {
    let user = await User.create(req.body)
    let token = signToken(user._id)
    res.status(201).json({
        status: 'success',
        user, token
    })
})

exports.login = catchAsync(async (req, res, next) => {
    let { email, password } = req.body
    let user = await User.findOne({ email }).select('+password')
    if (user) {
        let isCorrect = await user.correctPassword(password, user.password)
        if (!isCorrect) return next(new AppError('invalid email or password', 401))
        let token = signToken(user._id)
        res.status(201).json({
            status: 'success',
            token
        })

    } else {
        next(new AppError('invalid email or password', 401))
    }
})

exports.protect = catchAsync(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return next(new AppError('you are not logged in!', 401))
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return next(new AppError(err, 401))
        let user = await User.findById(decoded.id)
        if (!user) return next(new AppError('the user does not exist', 401))
        // check if user changed pswd after the token was issued
        let didHeChange = user.changedPasswordAfter(decoded.iat)
        if (didHeChange) return next(new AppError('user has changed password, login again', 401))
        req.user = user
        next()
    })
})

exports.restrictTo = (...roles) => {
   return catchAsync(async (req, res, next) => {
    if(!roles.includes(req.user.role)) return next(new AppError('only admin can delete tours', 401))
    next()
    })
}
