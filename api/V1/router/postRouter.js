const express = require('express')
const postRouter = express.Router()
const postController = require('../controller/postController')
const authMiddleware = require('../middleware/Auth')
//save post api
postRouter.post('/savepost', authMiddleware.checkToken, postController.savePost)
//get all the posts for the feed page
postRouter.post('/getallpost', authMiddleware.checkToken, postController.getAllPost)
postRouter.post('/like/:id', authMiddleware.checkToken, postController.addLike)
postRouter.post('/getallpostbyid/:id', authMiddleware.checkToken, postController.getAllPostByUserId)
module.exports = postRouter