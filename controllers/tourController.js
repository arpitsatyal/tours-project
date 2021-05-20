let fs = require('fs')
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkId = (req, res, next, id) => {
    if(id * 1 > tours.length) {
        return res.status(404).json({msg: 'no such id'})
    }
    next()
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours }
    })
}

exports.getOneTour = (req, res) => {
    let id = req.params.id * 1
    let tour = tours.find(el => el.id === id)
    res.status(200).json({
        status: 'success',
       data: { tour }
    })
}

exports.createTour =  (req, res) => {
    let newId = tours[tours.length - 1].id + 1
    let newTour = Object.assign({ id: newId }, req.body)
   
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
        res.status(201).json({
            status: 'success',
            tour: newTour
        })
    })
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success'
    })
}

exports.deleteTour =  (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}