let fs = require('fs')
let Tour = require('../../models/tourModel')
let User = require('../../models/userModel')
let Review = require('../../models/reviewModel')
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

let tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))
let users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
let reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'))

let importData = async () => {
  try {
    await Tour.create(tours)
    await User.create(users, { validateBeforeSave: false })
    await Review.create(reviews)
    console.log('data successfuly loaded!')
  } catch(e) {
    console.log(e)
  }
  process.exit()
}

// delete all data from collection
let deleteData = async () => {
  try {
    await Tour.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()
    console.log('data successfuly deleted!')
  } catch(e) {
    console.log(e)
  }
  process.exit()
}

let x = process.argv[2]
if(x === '--import') importData()
if(x === '--delete') deleteData()