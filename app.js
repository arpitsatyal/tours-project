let express = require('express')
let app = express()
let morgan = require('morgan')
let rateLimit = require('express-rate-limit')
let helmet = require('helmet')
let mongoSanitize = require('express-mongo-sanitize')
let xss = require('xss-clean')
let hpp = require('hpp')
let path = require('path')
let AppError = require('./utils/appError')
let errorController = require('./controllers/errorController')

let userRoutes = require('./routes/userRoutes')
let tourRoutes = require('./routes/tourRoutes')

// security http headers
app.use(helmet())
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
let limiter = rateLimit({
    max: 100, windowMs: 50 * 60 * 1000,
    message: 'too many requests from this IP. try again later..'
})

app.use('/api', limiter)
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ extended: false }));

// data sanitization vs NOSQL query injection
app.use(mongoSanitize())
// data sanitization vs XSS
app.use(xss())
// prevent parameter pollutions
app.use(hpp({
    whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 
'difficulty', 'price', 'maxGroupSize']
}))
// serving static files
app.use(express.static(`${__dirname}/public`))

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tours', tourRoutes)

app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on the server`, 404))
})

app.use(errorController) //GLOBAL ERROR HANDLER

module.exports = app