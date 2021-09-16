let catchAsync = require('../utils/catchAsync')
let AppError = require('../utils/appError')
let mapTours = require('../utils/mapTours')

exports.deleteOne = Model => {
    return catchAsync(async (req, res, next) => {
        let doc = await Model.findByIdAndDelete(req.params.id)
        if (!doc) {
            return next(new AppError('no document found with that ID.', 404))
        }
        res.status(204).json({
            status: 'success',
            data: null
        })
    })
}

exports.createOne = Model => catchAsync(async (req, res, next) => {
	let toCreate = mapTours({}, req.body)
    console.log('to creat', toCreate)
    let doc = await Model.create(toCreate)
    res.status(201).json({
        status: 'success',
        data: doc
    })
})

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    toUpdate = mapTours({}, req.body)
    let doc = await Model.findByIdAndUpdate(req.params.id, toUpdate, {
        new: true,
        runValidators: true
    })
    if (!doc) {
        return next(new AppError('no tour found with that ID.', 404))
    }
    res.status(200).json({
        status: 'success',
        tour: doc
    })
})

exports.getOne = (Model, populate) => catchAsync(async (req, res, next) => {
    let doc
    if (populate) {
        doc = await Model.findById(req.params.id).populate(populate)
    } else {
        doc = await Model.findById(req.params.id)
    }
    if (!doc) {
        return next(new AppError('no document found with that ID.', 404))
    }
    res.status(200).json({
        status: 'success',
        doc
    })
})

