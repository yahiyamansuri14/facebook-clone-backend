const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
//sending OTP api
router.post('/sentotp', userController.sentOtp)
//signup api
router.post('/signup', userController.register)
//login api
router.post('/login', userController.login)


module.exports = router