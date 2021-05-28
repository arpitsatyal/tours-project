let mongoose = require('mongoose')
let Tour = require('./tourModel')

let reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'review is needed.']
    },
    rating: {
        type: Number,
        validate: {
            validator: function (val) {
                return val <= 5
            },
            message: 'the rating cannot be more than 5.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user', select: 'name photo'
    })
    next()
})

reviewSchema.index({ tour: 1, user: 1 }, { unique: true })

// this referes to the current model
reviewSchema.statics.calcAverageRatings = async function (tourId) {
    let stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: '$tour',
                numRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ])
    if (stats.length) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].numRating
        })
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: 4.5,
            ratingsQuantity: 0
        })
    }
}

    reviewSchema.post('save', function () {
        this.constructor.calcAverageRatings(this.tour)
    })

    reviewSchema.pre(/^findOneAnd/, async function (next) {
        this.review = await this.findOne()
        next()
    })

    reviewSchema.post(/^findOneAnd/, async function () {
        await this.review.constructor.calcAverageRatings(this.review.tour)
    })

    let Review = mongoose.model('Review', reviewSchema)

    module.exports = Review

// findByIdAndDelete and findByIdAndUpdate dont work for document middleware,
// because document middleware only works for save/create
// but they work for query middleware