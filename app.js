let express = require('express')
let app = express()
let morgan = require('morgan')
let tourRouter = require('./routes/tourRoutes')
let userRouter = require('./routes/userRoutes')
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))

}
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app