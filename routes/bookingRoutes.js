let express = require('express')
let router = express.Router()
let bookingController = require('../controllers/bookingController')
let authController = require('../controllers/authController')

router.get('/checkout-session/:tourId', authController.protect, bookingController.getCheckoutSession)

module.exports = router