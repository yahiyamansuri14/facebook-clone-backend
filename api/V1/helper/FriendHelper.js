const LookupFriendModel = require('../model/LookupFriend')
let checkInLookupFriend = (sender_id, receiver_id) => {
    try{
        let data = LookupFriendModel.findOne({sender_id,receiver_id})
        console.log(data)
        if ( data != null && data != undefined){
            return true
        }else{
            return false
        }
    }catch(e){
        return false
    }
}
let deleteFromLookupDocument = ( sender_id, receiver_id) =>{
    try{
        let data = LookupFriendModel.findOneAndDelete( { sender_id, receiver_id } )
        if ( data != null)
            return true
        else
            return false
    }catch(e){
        return false
    }
}

module.exports = { deleteFromLookupDocument, checkInLookupFriend }