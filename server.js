let mongoose = require('mongoose')
let dotenv = require('dotenv')

// uncaught exception
// process.on('uncaughtException', err => {
//     console.log('uncaught exception. shutting down...')
//     console.log(err.name, err.message)
//     process.exit(1)
// })

dotenv.config({ path: './config.env' })
let DB = process.env.DATABASE_LOCAL
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('db connected!'))

let app = require('./app')
let port = process.env.PORT || 3000
let server = app.listen(port, () => console.log(`app running on...${port}`))

// unhandled rejections
// process.on('unhandledRejection', err => {
//     console.log('unhandled rejection. shutting down...')
//     console.log(err.name, err.message)
//     server.close(() => process.exit(1))
// })
