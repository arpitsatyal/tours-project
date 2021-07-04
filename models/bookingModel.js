let mongoose = require('mongoose')

let bookingSchema = new mongoose.Schema({

})

let Booking = mongoose.model('booking', bookingSchema)

module.exports = Booking