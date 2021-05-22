let mongoose = require('mongoose')

let tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'tour name is required.'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'tour must have a duration.']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'tour must have a group size.']
    },
    difficulty: {
        type: String,
        required: [true, 'tour must have difficulty.']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'tour must have a price.']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'tour must have a description.']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'tour must have cover image.']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    startDates: [Date]
})

let Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour