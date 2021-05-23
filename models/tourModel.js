let mongoose = require('mongoose')
let slugify = require('slugify')
let validator = require('validator')

let tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'tour name is required.'],
        unique: true,
        trim: true,
        maxlength: [40, 'tour name cannot have more than 40 characters.'],
        minlength: [10, 'tour name must have atleast 10 characters.']
    },
    slug: String,
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
        required: [true, 'tour must have difficulty.'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'difficulty must be easy, medium or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'rating must be above 1.0'],
        max: [5, 'rating cannot be more than 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'tour must have a price.']
    },
    priceDiscount: {
        type: Number,
        // own validator function
        validate: {
        validator: function(val) {
            return val < this.price
        },
        message: 'discount price {VALUE} cannot be greater than the price'
    }
    },
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
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true }
}, {
    toObject: { virtuals: true }
})

tourSchema.virtual('duartionWeeks').get(function () {
    return this.duration / 7
    // this points to the current document
})
// document middleware -- runs before the save and create command
// but not on insertMany
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

// tourSchema.post('save', function(doc, next) {
//     console.log(doc)
//     next()
// })

// query middleware -- this referes to the current query
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } })
    this.start = Date.now()
    next()
})

tourSchema.post(/^find/, function (docs, next) {
    console.log(`query took ${Date.now() - this.start} ms.`)
    next()
})

// aggregation middleware
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
    next()
})
let Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour