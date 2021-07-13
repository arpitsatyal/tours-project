let AppError = require('../utils/appError')

function sendErrorDev(err, res) {
	console.log(err.message)
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

function sendErrorProd(err, res) {
    //operational errors, trusted error --- send msg to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        // programming or unknown errors --- so dont leak the errors
        console.error('error!', err)
        res.status(500).json({
            status: 'err',
            error: err,
            message: 'something went wrong.'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        if(err.name === 'CastError') err = handleCastErrorDB(err)
        if(err.code === 11000) err = handleDuplicateFieldDB(err)
        if(err.name === 'ValidationError') err = handleValidationErrorDB(err)
        sendErrorProd(err, res)
    }
}

function handleCastErrorDB(err) {
    let message = `invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}
function handleDuplicateFieldDB(err) {
    let value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    let message = `duplicate field value: ${value}. please use a different name.`
    return new AppError(message, 400)
}
function handleValidationErrorDB(err) {
    let errors = Object.values(err.errors)
    let errMessages = errors.map(e => e.message)
    let message = `${errMessages.join('. ')}`
    return new AppError(message, 400)
}