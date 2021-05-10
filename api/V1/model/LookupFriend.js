const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lookupFriendSchema = new Schema({
        user_id:String,
        friends:Array
})

const LookupFriendModel = mongoose.model('LookupFriend', lookupFriendSchema)
module.exports = LookupFriendModel