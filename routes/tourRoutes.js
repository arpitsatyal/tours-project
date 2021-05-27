let express = require('express')
let router = express.Router()
let tourController = require('../controllers/tourController')
let authController = require('../controllers/authController')
let reviewRouter = require('./reviewRoutes')

router.use('/:tourId/reviews', reviewRouter)

// router.param('id', tourController.checkId)
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)
router.route('/tour-stats').get(tourController.getTourStats)
router.route('/tour-monthly-plan/:year').get(tourController.getMonthlyPlan)

router.route('/')
.get(authController.protect, tourController.getAllTours)
.post(tourController.createTour)

router.route('/:id')
.get(tourController.getOneTour)
.patch(tourController.updateTour)
.delete(authController.protect, 
    authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour)

// router.route('/:tourId/reviews')
// .post(authController.protect, 
//     authController.restrictTo('user'), reviewController.createReview)

module.exports = router