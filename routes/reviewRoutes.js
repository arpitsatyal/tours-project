let express = require('express')
let router = express.Router({ mergeParams: true })
let reviewController = require('../controllers/reviewController')
let authController = require('../controllers/authController')

router.use(authController.protect)

router.route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.restrictTo('user'), 
        reviewController.setTourIds,
         reviewController.createReview)

router.route('/:id')
.get(reviewController.getOneReview)
.patch(authController.restrictTo('user'), reviewController.updateReview)
.delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview)

module.exports = router