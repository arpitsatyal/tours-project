let User = require('../models/userModel')
let catchAsync = require('../utils/catchAsync')
let jwt = require('jsonwebtoken')
let AppError = require('../utils/appError')
let sendEmail = require('../utils/email')
let crypto = require('crypto')

let signToken = id => jwt.sign({ id }, process.env.JWT_SECRET)

let sendToken = (user, res, statusCode) => {
    let token = signToken(user._id)
let cookieOptions =  {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
    }
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true
    res.cookie('jwt', token, cookieOptions)
    user.password = undefined
     res.status(201).json({
        status: 'success',
        user, token
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    let user = await User.create(req.body)
    sendToken(user, res, 201)
})

exports.login = catchAsync(async (req, res, next) => {
    let { email, password } = req.body
    let user = await User.findOne({ email }).select('+password')
    if (user) {
        let isCorrect = await user.correctPassword(password, user.password)
        if (!isCorrect) return next(new AppError('invalid email or password', 401))
       sendToken(user, res, 200)
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
        if (!roles.includes(req.user.role)) return next(new AppError('only admin can delete tours', 401))
        next()
    })
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // get user based on email
    let user = await User.findOne({ email: req.body.email })
    if (!user) return next(new AppError('there is no user with that email', 404))
    // generate random reset token
    let resetToken = user.createResetToken()
    await user.save({ validateBeforeSave: false })
    // send it to users email
    let resetURL = `${req.protocol}://${req.get(
        'host')}/api/v1/users/resetPassword/${resetToken}`
    let message = `forgot your password? send your new password to ${resetURL}. 
    if you didnt send it, ignore this.`
    try {
       await sendEmail({ 
        email: user.email,
        subject: 'password reset token',
        message
    })
    res.status(200).json({
        status: 'success', message: 'token sent to email.'
    })  
    } catch(e) {
        console.log(e)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })
        return next(new AppError('there was error sending email. try again', 500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1 get user based on token
   let hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
    let user = await User.findOne({ passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }})
    // 2 set the password, only if token hasnt expired and there is a user
    if(!user) return next(new AppError('token is invalid or has expired', 400))
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    // 3 login the user, send JWT
    sendToken(user, res, 200)
})

exports.updatePassword = catchAsync(async(req, res, next) => {
    // get user from collection
    let user = await User.findById(req.user._id).select('+password')
    // check if the current password is correct
    let isCorrect = await user.correctPassword(req.body.password, user.password)
    // if yes update the pswd
    if(!isCorrect) return next(new AppError('invalid password', 401))
    user.password = req.body.newpassword
    user.passwordConfirm = req.body.newpassword
    await user.save()
    // send jwt
    sendToken(user, res, 200)
})