let Tour = require('../models/tourModel')
let catchAsync = require('../utils/catchAsync')

exports.getTourStats = async (req, res, next) => {
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
}

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
