let mongoose = require('mongoose')
let dotenv = require('dotenv')
dotenv.config({path: './config.env'})
let DB = process.env.DATABASE_LOCAL
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('db connected!'))
.catch(() => console.log('error occured.'))

let app = require('./app')
let port = process.env.PORT || 3000
app.listen(port, () => console.log(`app running on...${port}`))