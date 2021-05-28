let express = require('express')
let router = express.Router()
let usersController = require('../controllers/userController')
let authController = require('../controllers/authController')

// these dont need to be protected
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.use(authController.protect)

router.patch('/updatePassword', authController.updatePassword)
router.get('/getMe', usersController.setUserId, usersController.getMe)
router.patch('/updateMe', usersController.updateMe)
router.delete('/deleteMe', usersController.deleteMe)

router.use(authController.restrictTo('admin'))

router.route('/')
    .get(usersController.getAllUsers)

router.route('/:id')
    .get(usersController.getOneUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router