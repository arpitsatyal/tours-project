let Tour = require('../models/tourModel')

exports.getAllTours = async (req, res) => {
    try {
        // filtering
        console.log(req.query)
        let queryObject = { ...req.query }
        let excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObject[el])

        // advanced filtering
        let queryString = JSON.stringify(queryObject)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryString))
        let query = Tour.find(JSON.parse(queryString))

        // sorting
        if(req.query.sort) {
            let sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy) 
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }
        // execute query
        let tours = await query
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: { tours }
        })
    } catch (e) { res.status(404).json({msg: e}) }
}

exports.getOneTour = async (req, res) => {
    let tour = await Tour.findById(req.params.id)
    res.status(200).json({
        status: 'success',
        data: { tour }
    })
}

exports.createTour = async (req, res) => {
    let newTour = await Tour.create(req.body)
    res.status(201).json({
        status: 'success',
        tour: newTour
    })
}

exports.updateTour = async (req, res) => {
    let updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        tour: updatedTour
    })
}

exports.deleteTour = async (req, res) => {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
        data: null
    })
}