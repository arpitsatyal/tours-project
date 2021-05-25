let mongoose = require('mongoose')
let validator = require('validator')
let bcrypt = require('bcryptjs')

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please insert a name'],

    },
    email: {
        type: String,
        required: [true, 'please insert a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'invalid email']
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guide', 'lead-guide'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'please insert a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please insert the same password'],
        validate: {
            validator: function (val) {
                return this.password === val
            },
            message: 'the passwords do not match.'
        }
    },
    passwordChangedAt: Date,
    photo: String

})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
})

//methods are accessible to the instances
userSchema.methods.correctPassword = async function(reqbodyPassword, userPassword) {
    return await bcrypt.compare(reqbodyPassword, userPassword)
}
// this = current document
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        let changedTimetamp = this.passwordChangedAt.getTime() / 1000
        return changedTimetamp > JWTTimestamp
    }
    return false
}

let User = mongoose.model('User', userSchema)

module.exports = User