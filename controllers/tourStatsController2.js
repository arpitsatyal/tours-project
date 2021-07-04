let Tour = require('../models/tourModel')
let catchAsync = require('../utils/catchAsync')

// match le chai relevant data find garne
// group le chai kun fields le data separate garne

//tour stats, first match all the tours having grp size greater than 15,
//  then group those matching tours acc to their startLocation and calculate averages and etc

exports.getTourStats = catchAsync(async (req, res, next) => {
    let stats = await Tour.aggregate([
        {
            $match: { maxGroupSize: { $gte: 15 } }
        },
        {
            $group: {
                _id: '$startLocation',
                numRating: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                numTours: { $sum: 1 }
            }
        }
    ])
    res.status(200).json({
        status: 'success', results: stats.length, stats
    })
})
// find kun month ma kun kun tours and kati ota tours
// $unwind = deconstruct an array
// $month = returns the month of a date as a number between 1(jan) and 12(dec)

exports.monthlyPlan = catchAsync(async (req, res, next) => {
    let year = req.params.year * 1
    let monthlyPlan = await Tour.aggregate([
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
        },
        {
            $addFields: { month: '$_id' }
        }
    ])
    res.status(200).json({
        status: 'success', results: monthlyPlan.length, monthlyPlan
    })
})