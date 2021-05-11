const LookupFriendModel = require('../model/LookupFriend')
let checkInLookupFriend = async (sender_id, receiver_id) => {
    try{
        let data = await LookupFriendModel.findOne({sender_id,receiver_id})
        console.log('111111111111111111',data)
        if ( data != null){
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