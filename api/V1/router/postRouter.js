const express = require('express')
const postRouter = express.Router()
const postController = require('../controller/postController')
const authMiddleware = require('../middleware/Auth')
//save post api
postRouter.post('/savepost', authMiddleware.checkToken, postController.savePost)

//get all the posts for the feed page
postRouter.post('/getallpost', authMiddleware.checkToken, postController.getAllPost)


module.exports = postRouter