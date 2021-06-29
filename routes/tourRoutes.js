let express = require('express')
let router = express.Router()
let tourController = require('../controllers/tourController')
let tourStatsController = require('../controllers/tourStatsController')
let authController = require('../controllers/authController')
let reviewRouter = require('./reviewRoutes')
let { uploadTourImages, resizeTourImages } = require('../controllers/multerController')

router.use('/:tourId/reviews', reviewRouter)

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)
router.route('/tour-stats').get(tourStatsController.getTourStats)
router.route('/tour-monthly-plan/:year').get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourStatsController.getMonthlyPlan)


    router.route('/')
    .get(tourController.getAllTours)
    .post(
        authController.protect,
         authController.restrictTo('admin', 'lead-guide'),
        tourController.createTour)
    
    router.route('/:id')
    .get(tourController.getOneTour)
    .patch(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
       uploadTourImages, resizeTourImages,
        tourController.updateTour)
    .delete(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        tourController.deleteTour)

router.post('/searchTour', tourController.searchTour)
module.exports = router