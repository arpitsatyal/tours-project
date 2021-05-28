let Review = require('../models/reviewModel')
let catchAsync = require('../utils/catchAsync')
let handlerFactory = require('./handlerFactory')

exports.setTourIds = (req, res, next) => {
    req.body.tour = req.params.tourId
    req.body.user = req.user.id
    next()
}

exports.getAllReviews = catchAsync(async(req, res, next) => {
    let filter = {}
    if(req.params.tourId) filter = { tour: req.params.tourId }
    let reviews = await Review.find(filter)
    res.status(200).json({
        status: 'success', 
        results: reviews.length,
        reviews
    })
})

exports.createReview = handlerFactory.createOne(Review)
exports.getOneReview = handlerFactory.getOne(Review)
exports.updateReview = handlerFactory.updateOne(Review)
exports.deleteReview = handlerFactory.deleteOne(Review)