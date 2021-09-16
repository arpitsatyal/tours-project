let Tour = require('../models/tourModel')
let catchAsync = require('../utils/catchAsync')

// match le chai relevant data find garne
// group le chai kun fields le data separate garne / k k data dekhaune

//tour stats, first match all the tours having grp size greater than 15,
//  then group those matching tours acc to their startLocation and calculate averages and etc

exports.getTourStats = catchAsync(async (req, res, next) => {
    let stats = Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4 }}
        },
        {
            $group: {
                _id: '$difficulty',
                avgRatings: { $avg: '$ratingsAverage' },
                numRatings: { $sum: '$ratingsQuantity'},
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                avgPrice: { $avg: '$price' },
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
                _id: { $month: '$startDates' }, //returns month of a certain date.
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        // {
        //     $addFields: { month: '$_id' }
        // }
    ])
    
    await Tour.aggregate(monthlyPlan, {path: "name"})
    res.status(200).json({
        status: 'success', results: monthlyPlan.length, monthlyPlan
    })
})