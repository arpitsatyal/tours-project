let Tour = require('../models/tourModel')
let catchAsync = require('../utils/catchAsync')
let AppError = require('../utils/appError')

exports.aliasTopTours = async (req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage, price'
    req.query.fields = 'name, price, ratingsAverage, summary, difficulty'
    next()
}

exports.getAllTours = catchAsync(async (req, res, next) => {
        // filtering
        // console.log(req.query)
        let queryObject = { ...req.query }
        let excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObject[el])

        // advanced filtering
        let queryString = JSON.stringify(queryObject)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        let query = Tour.find(JSON.parse(queryString))

        // sorting
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
        // execute query 
        let tours = await query
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: { tours }
        })
})

exports.getOneTour = catchAsync(async (req, res, next) => {
    let tour = await Tour.findById(req.params.id)
    if(!tour) {
        return next(new AppError('no tour found with that ID.', 404))
    }
    res.status(200).json({
        status: 'success',
        data: { tour }
    })
})

exports.createTour = catchAsync(async (req, res, next) => {
    let newTour = await Tour.create(req.body)
    res.status(201).json({
        status: 'success',
        tour: newTour
    })
})

exports.updateTour = catchAsync(async (req, res, next) => {
    let updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!updatedTour) {
        return next(new AppError('no tour found with that ID.', 404))
    }
    res.status(200).json({
        status: 'success',
        tour: updatedTour
    })
})

exports.deleteTour = catchAsync(async (req, res, next) => {
    let tour = await Tour.findByIdAndDelete(req.params.id)
    if(!tour) {
        return next(new AppError('no tour found with that ID.', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.getTourStats = catchAsync(async (req, res, next) => {
    try {
        let stats = await Tour.aggregate([
            {
                $match: {
                    ratingsAverage: { $gte: 4.5 }
                }
            },
            {
                $group: {
                    _id: '$difficulty',
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    numTours: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            }, {
                $sort: {
                    avgPrice: 1
                }
            },
            // {
            //     $match: { _id: { $ne: 'easy'} }
            // }
        ])
        res.status(200).json({
            status: 'success',
            data: stats
        })
    } catch (e) {
        res.status(404).json({
            status: 'fail',
            message: e
        })
    }
})

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    let year = req.params.year * 1
    let plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        }
        , {
            $addFields: { month: '$_id' }
        }
        , {
            $project: { _id: 0 }
        }, {
            $sort: { numTourStarts: -1 }
        }, {
            $limit: 12
        }
    ])
    res.status(200).json({
        status: 'success!',
        results: plan.length,
        data: { plan }
    })
})
