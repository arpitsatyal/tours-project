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
    let queryObject = { ...req.query }
    let excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObject[el])

    // advanced filtering
    // console.log(queryObject)
    let queryString = JSON.stringify(queryObject)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    // console.log(queryString)
    let query = Tour.find(JSON.parse(queryString))

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
    let page = req.query.page * 1 || 1
    let limit = req.query.limit * 1 || 100
    let skip = (page - 1) * limit
    query = query.skip(skip).limit(limit)
    if (req.query.page) {
        let numTours = await Tour.countDocuments()
        if (skip >= numTours) throw new Error('this page does not exist.')
    }
    // // execute query 
    let tours = await query
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours }
    })
})

let mapTours = require('../utils/mapTours')
const AppError = require('../utils/appError')

exports.updateTour = catchAsync(async (req, res, next) => {
    toUpdate = mapTours({}, req.body)
    // console.log(req.files)
    // console.log('to updateee', toUpdate)
    let currentTour = await Tour.findById(req.params.id)

    if (req.files.imageCover) {
        deleteFile('tours', currentTour.imageCover)
    } 
    if (req.files.images) {
        currentTour.images.forEach(image => deleteFile('tours', image))
    }

    let tour = Tour.findByIdAndUpdate(req.params.id, toUpdate, {
        runValidators: true,
        new: true
    })
        .then(async doc => {
            if (toUpdate.startDate) await Tour.findByIdAndUpdate(req.params.id, { $push: { startDates: toUpdate.startDate } })
            if (toUpdate.locations) await Tour.findByIdAndUpdate(req.params.id, {
                $push: {
                    locations: { address: toUpdate.Location }
                }
            })
            res.status(200).json({
                status: 'success',
                doc
            })
        })
        .catch(err => next(err))
    if (!tour) {
        return next(new AppError('no tour found with that ID.', 404))
    }
})

exports.searchTour = catchAsync(async (req, res, next) => {
    let toSearch = mapTours({}, req.body)
    let condition = {}
    // console.log('searched>>', toSearch)
    //price search
    if (toSearch.minPrice) {
        condition.price = { $gte: toSearch.minPrice }
    }
    if (toSearch.maxPrice) {
        condition.price = { $lte: toSearch.maxPrice }
    }
    if (toSearch.maxPrice && toSearch.minPrice) {
        condition.price = { $lte: toSearch.maxPrice, $gte: toSearch.minPrice }
    }
    // group size search
    switch (toSearch.maxGroupSize) {
        case '0-10': condition.maxGroupSize = { $gt: 0, $lt: 10 }
            break
        case '10-20': condition.maxGroupSize = { $gt: 10, $lt: 20 }
            break
        case '20 +': condition.maxGroupSize = { $gt: 20 }
    }
    if (toSearch.name) {
        condition.name = toSearch.name
    }
    if (toSearch.startLocation) {
        condition.startLocation = toSearch.startLocation
    }
    if (toSearch.difficulty) {
        condition.difficulty = toSearch.difficulty
    }
    console.log('condition', condition)
    let tours = await Tour.find(condition)
    res.status(200).json({
        status: 'success', results: tours.length, tours
    })
})

exports.getOneTour = handlerFactory.getOne(Tour, 'reviews')
exports.createTour = handlerFactory.createOne(Tour)
exports.deleteTour = handlerFactory.deleteOne(Tour)

