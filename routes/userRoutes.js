let express = require('express')
let router = express.Router()
let users = require('../controllers/userController')

router.route('/')
.get(users.getAllUsers)
.post(users.createUser)

router.route('/:id')
.get(users.getOneUser)
.patch(users.updateUser)
.delete(users.deleteUser)

module.exports = router