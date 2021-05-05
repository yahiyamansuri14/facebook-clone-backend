const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    textContent:String,
    likes:Number,
    dislikes:Number,
    user_id:String
},{timestamps:true})

const postModel = mongoose.model('Post', postSchema)
module.exports = postModel