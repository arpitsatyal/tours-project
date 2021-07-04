let express = require('express')
let router = express.Router({ mergeParams: true })
let reviewController = require('../controllers/reviewController')
let authController = require('../controllers/authController')

router.route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo('user'), 
        reviewController.setTourIds,
         reviewController.createReview)

router.route('/:id')
.get(reviewController.getOneReview)
.patch(authController.protect, authController.restrictTo('user'), reviewController.setTourIds, reviewController.updateReview)
.delete(authController.protect, authController.restrictTo('user', 'admin'), reviewController.deleteReview)

module.exports = router