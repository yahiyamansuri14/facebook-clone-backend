const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendSchema = new Schema({
        sender_id:String,
        receiver_id:String
})

FriendModel = mongoose.model('friend', friendSchema)
module.exports = FriendModel