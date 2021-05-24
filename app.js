let express = require('express')
let app = express()
let morgan = require('morgan')
let path = require('path')
let AppError = require('./utils/appError')
let errorController = require('./controllers/errorController')

let userRoutes = require('./routes/userRoutes')
let tourRoutes = require('./routes/tourRoutes')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tours', tourRoutes)

app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on the server`, 404))
})

app.use(errorController) //GLOBAL ERROR HANDLER

module.exports = app