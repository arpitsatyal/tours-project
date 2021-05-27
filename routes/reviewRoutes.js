let express = require('express')
let router = express.Router({ mergeParams: true })
let reviewController = require('../controllers/reviewController')
let authController = require('../controllers/authController')

router.route('/')
    .get(authController.protect, reviewController.getAllReviews)

    .post(authController.protect,
        authController.restrictTo('user'), reviewController.setTourIds, reviewController.createReview)

router.route('/:id')
.patch(reviewController.updateReview)
.delete(reviewController.deleteReview)
module.exports = router