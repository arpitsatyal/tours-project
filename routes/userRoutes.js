let express = require('express')
let router = express.Router()
let usersController = require('../controllers/userController')
let authController = require('../controllers/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/')
.get(usersController.getAllUsers)

router.route('/:id')
.get(usersController.getOneUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports = router