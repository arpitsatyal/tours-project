let express = require('express')
let router = express.Router()
let tourController = require('../controllers/tourController')

router.param('id', tourController.checkId)
router.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour)

router.route('/:id')
.get(tourController.getOneTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router