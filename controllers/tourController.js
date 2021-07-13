let Tour = require('../models/tourModel')
let catchAsync = require('../utils/catchAsync')
let handlerFactory = require('./handlerFactory')
let { deleteFile } = require('./multerController')

exports.aliasTopTours = async (req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage, price'
    req.query.fields = 'name, price, ratingsAverage, summary, difficulty'
    next()
}

exports.getAllTours = catchAsync(async (req, res, next) => {
    // filtering
    // let queryObject = { ...req.query }
    // let excludedFields = ['page', 'sort', 'limit', 'fields']
    // excludedFields.forEach(el => delete queryObject[el])

    // advanced filtering
    // console.log(queryObject)
    // let queryString = JSON.stringify(queryObject)
    // queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    // console.log('query string', queryString)
    let query = Tour.find()

    // // sorting
    if (req.query.sort) {
        let sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }
    //limiting fields i.e. projecting
    if (req.query.fields) {
        let fields = req.query.fields.split(',').join(' ')
        query = query.select(fields)
    } else {
        query = query.select('-__v')
    }
    // pagination
    console.log(req.query)
    let currentPage = req.query.currentpage * 1 
    let pageSize = req.query.pagesize * 1 
    if(currentPage && pageSize) {
        let skip = pageSize * (currentPage - 1)
        query = query
        .skip(skip)
        .limit(pageSize)
        var totalTours = await Tour.countDocuments()
            if (skip >= totalTours) throw new Error('this page does not exist.')
    } 
    // // execute query 
    let tours = await query
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours, totalTours }
    })
})

let mapTours = require('../utils/mapTours')
const AppError = require('../utils/appError')

exports.updateTour = async (req, res, next) => {
    toUpdate = mapTours({}, req.body)
    // console.log(req.files)
    // console.log(req.body)
    console.log('to updateee', toUpdate)
    var currentTour = await Tour.findById(req.params.id)

    if (req.files) {
        req.files.imageCover ? deleteFile('tours', currentTour.imageCover) : currentTour.images.forEach(image => deleteFile('tours', image))

    }
    let tour = Tour.findByIdAndUpdate(req.params.id, toUpdate, { runValidators: true, new: true })
        .then(async doc => {
            if (req.body.startDate) await Tour.findByIdAndUpdate(req.params.id, { $push: { startDates: req.body.startDate } })

            if (req.body.locations) {
                if (req.body.locations.address) await Tour.findByIdAndUpdate(req.params.id, {
                        $push: { locations: { address: req.body.locations.address } }
                    })
                    let locations = []
                    let tour =  await Tour.findById(req.params.id)
                    locations = tour.locations
                    locations.forEach(async loc => {
                        if (loc.address === req.body.locations.address) if (req.body.locations.longitude && req.body.locations.latitude) {
                                    loc.coordinates.push(req.body.locations.longitude, req.body.locations.latitude)
                                    await tour.save()
                        }
                    })
            }
            if (req.body.startLocation) {
                if (req.body.startLocation.description) await Tour.findByIdAndUpdate(req.params.id,
                    { $set: { 'startLocation.description': req.body.startLocation.description } })
            }
            res.status(200).json({
                status: 'success',
                doc
            })
        })
        .catch(err => next(err))

    if (!tour) {
        return next(new AppError('no tour found with that ID.', 404))
    }
}

exports.searchTour = (req, res, next) => {
    let condition = {}
    let toSearch = mapTours(condition, req.body)
    // console.log(req.body)
    console.log('condition', condition)
    let final = []
    Tour.find(toSearch)
    .then(async tours => {
        if(req.body.startLocation && req.body.startLocation.description) {
            let withStartLocation = await Tour.find({ 'startLocation.description': req.body.startLocation.description })
            tours.forEach(tour => {
                withStartLocation.forEach(loc => {
                    if(tour.name === loc.name) final.push(loc)
                })
            })
        } else {
            final = tours
        }
        res.status(200).json({
            status: 'success', results: final.length, final
        })
    })
    .catch (err => next(err))
}

exports.getOneTour = handlerFactory.getOne(Tour, 'reviews')
exports.createTour = handlerFactory.createOne(Tour)
exports.deleteTour = handlerFactory.deleteOne(Tour)

