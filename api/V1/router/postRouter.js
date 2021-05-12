const express = require('express')
const postRouter = express.Router()
const postController = require('../controller/postController')
const authMiddleware = require('../middleware/Auth')
//save post api
postRouter.post('/savepost', authMiddleware.checkToken, postController.savePost)
//get all the posts for the feed page
postRouter.post('/getallpost', authMiddleware.checkToken, postController.getAllPost)
postRouter.post('/getallpostbyid/:id', authMiddleware.checkToken, postController.getAllPostByUserId)
postRouter.post('/deletepostbyid/:id', authMiddleware.checkToken, postController.deletePostById)
postRouter.post('/likepost/:id', authMiddleware.checkToken, postController.likePost)
postRouter.post('/dislikepost/:id', authMiddleware.checkToken, postController.dislikePost)

module.exports = postRouter