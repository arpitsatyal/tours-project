let catchAsync = require('../utils/catchAsync')
let AppError = require('../utils/appError')

exports.deleteOne = Model => {
    return catchAsync(async (req, res, next) => {
    let doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc) {
        return next(new AppError('no document found with that ID.', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})
}

exports.createOne = Model => catchAsync(async (req, res, next) => {
        let doc = await Model.create(req.body)
    res.status(201).json({
        status: 'success',
        data: doc
    })
})

exports.updateOne = Model => catchAsync(async (req, res, next) => {
        let doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!doc) {
            return next(new AppError('no tour found with that ID.', 404))
        }
        res.status(200).json({
            status: 'success',
            tour: doc
        })
    })
