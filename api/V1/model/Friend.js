const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendSchema = new Schema({
        user_id:String,
        friends:Array
})

FriendModel = mongoose.model('friend', friendSchema)
module.exports = FriendModel