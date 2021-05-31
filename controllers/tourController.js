let Tour = require('../models/tourModel')
let catchAsync = require('../utils/catchAsync')
let handlerFactory = require('./handlerFactory')

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

exports.updateTour = catchAsync(async (req, res, next) => {
    toUpdate = mapTours({}, req.body)
    let doc
    if (toUpdate.startDate) {
        doc = await Tour.findByIdAndUpdate(req.params.id, { $push: { startDates: toUpdate.startDate } }, {
            new: true,
            runValidators: true
        })
    } else {
        doc = await Tour.findByIdAndUpdate(req.params.id, toUpdate, {
            new: true,
            runValidators: true
        })
    }
    if (!doc) {
        return next(new AppError('no tour found with that ID.', 404))
    }
    res.status(200).json({
        status: 'success',
        tour: doc
    })
})

exports.getOneTour = handlerFactory.getOne(Tour, 'reviews')
exports.createTour = handlerFactory.createOne(Tour)
// exports.updateTour = handlerFactory.updateOne(Tour)
exports.deleteTour = handlerFactory.deleteOne(Tour)

