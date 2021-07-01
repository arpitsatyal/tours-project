let multer = require('multer')
let AppError = require('../utils/appError')
let sharp = require('sharp')
let fs = require('fs')
let path = require('path')

//uploading via memory storage
let multerStorage = multer.memoryStorage()

let multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('its not an image, dude. cmon'), false)
    }
}

let upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

//for user's profile pic
uploadUserPhoto = upload.single('photo')

//resizing the photos
async function resize(file, filename, path) {
      return await sharp(file)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/${path}/${filename}`)
}

resizeUserPhoto = async (req, res, next) => {
    if (!req.file) return next()
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`
    await resize(req.file.buffer, req.file.filename, 'users')
    next()
}

uploadTourImages = upload.fields([
    {
        name:'imageCover', maxCount: 1
    },
    {
        name: 'images', maxCount: 3
    }
])

// resizing the tour images
resizeTourImages = async (req, res, next) => {
    if (!req.files) return next()
    if(req.files.imageCover) {
        let filename = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
        req.body.imageCover = filename
        await resize(req.files.imageCover[0].buffer, filename, 'tours')
    }
    if (req.files.images) {
        req.body.images = []
        await Promise.all(
            req.files.images.map(async (file, i) => {
            let filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`
            await resize(file.buffer, filename, 'tours')
                req.body.images.push(filename)
        })
        )
    }
    next()
}

function deleteFile(dest, oldImages) {
    let p = path.join(process.cwd() + `/public/img/${dest}/${oldImages}`)
    fs.unlink(p, (err, done) => err ? console.log('err in deleting old images.') : console.log('old images is removed'))
}

module.exports = {
    resizeUserPhoto, uploadUserPhoto,
     uploadTourImages, resizeTourImages, deleteFile
}

