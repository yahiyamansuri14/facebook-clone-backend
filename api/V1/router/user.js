const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/Auth')
const userController = require('../controller/userController')
//sending OTP api
router.post('/sentotp', userController.sentOtp)
//signup api
router.post('/signup', userController.register)
//login api
router.post('/login', userController.login)
//get user profile api
router.post('/getuserprofile/:id', authMiddleWare.checkToken, userController.getUserProfile)
//accept friend request
router.post('/acceptrequest/:id', authMiddleWare.checkToken, userController.acceptFriendRequest)
//sent friend request
router.post('/sendfriendrequest/:id', authMiddleWare.checkToken, userController.sentFriendRequest)
//show friend request
router.post('/showfriendrequest', authMiddleWare.checkToken, userController.showFriendRequest)
module.exports = router