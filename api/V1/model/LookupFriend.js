const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lookupFriendSchema = new Schema({
        sender_id:String,
        receiver_id:String
})

const LookupFriendModel = mongoose.model('LookupFriend', lookupFriendSchema)
module.exports = LookupFriendModel