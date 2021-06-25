let multer = require('multer')
let AppError = require('../utils/appError')

// let multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,'./public/img/users')
//     },
//     filename: (req, file, cb) => {
//         console.log('file multer', file)
//         let ext = file.mimetype.split('/')[1]
//         cb(null, `user-${req.user._id}-${Date.now()}.${ext}`)
//     }
// })

let multerStorage = multer.memoryStorage()

let multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('its not an image, dude. cmon'), false)
    }
}

let upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single('photo') 

