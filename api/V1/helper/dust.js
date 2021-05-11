/* //bcrypt test
router.post('/testbcrypt', async (req,res)=>{
    let { password } = req.body
    let pwd = await bcrypt.hash(password, 10 )
    console.log(pwd)
    res.send({status:"OK",msg:"password saved",data:[]})

})
router.post('/testcompare', async (req,res)=>{
let {password}  = req.body
let pwd = await bcrypt.hash("yahiya1998", 10)
let isSame = await bcrypt.compare(password, pwd)
console.log(password)
console.log(pwd)
if (isSame){
    res.send({status:"OK",msg:"password match"})
}else{
    res.send({status:"ERR",msg:"password mismatch"})
}
}) 


//authenticate token
function authenticateToken(req,res,next){
     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]
     if ( token == null) return res.sendStatus(401)
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
         if (err) return res.sendStatus(403)
         req.user = user
         next()
     })
     let accepFriendRequest = (req, res) => {
    let sender_id = req.params.id
    let receiver_id = req.decoded.id
    console.log(sender_id, receiver_id)
    if (FriendHelper.checkInLookupFriend(sender_id, receiver_id)) {
        if (FriendHelper.deleteFromLookupDocument(sender_id, receiver_id)) {
            let newFriend = new FriendModel({ sender_id, receiver_id })
            newFriend.save()
                .then(data => {
                    if (data != null)
                        res.send({ status: "OK", message: "Friend Request Accept" })
                    else
                        res.send({ status: "ERR", message: "There is some problem,pls try after some time" })
                })
                .catch(err => {
                    res.send({ status: "ERR", message: "There is some problem,pls try after some time" })
                })
        } else {
            res.send({ status: "ERR", message: "There is some problem,pls try after some time" })
        }
    } else {
        res.send({ status: "ERR", message: "There is some problem,pls try after some time" })
    }

}
/* let sentFriendRequest = (req, res) => {
    let { id } = req.params
    let sender_id = req.decoded.id
    console.log(id,sender_id)
    console.log(FriendHelper.checkInLookupFriend(sender_id, id))
    if ( !FriendHelper.checkInLookupFriend(sender_id, id)) {
        let newFriendLookup = new LookupFriendModel({ sender_id, receiver_id: id })
        newFriendLookup.save()
            .then(data => {
                if (data != null)
                    res.send({ status: "OK", message: "Friend Request Sent" })
                else
                    res.send({ status: "ERR", message: "There is some problem,pls try after some time" })
            })
            .catch(err => {
                res.send({ status: "ERR", message: "There is some problem,pls try after some time" })
            })
    } else {
        res.send({ status: "ERR", message: "No Friend Request Sent" })
    }

} */
/*
let sentFriendRequest = async (req, res) => {
    let { id } = req.params
    let user_id = req.decoded.id

    let data = await LookupFriendModel.findOne({ user_id })
 
    if (data == null) {
        //its first time create an array and push id int it and save it 
        const friends = []
        friends.push(id)
        let newLookUpFriend = new LookupFriendModel({ user_id, friends })
        newLookUpFriend.save()
            .then(data => {
                console.log(data)
                res.send({ status: "OK", message: "Friend Request Sent" })
            })
            .catch(err => {
                console.log(err)
                res.send({ status: "ERR", message: "There is some error, pls try again letter" })
            })
    } else {
        //its not hte first time, get array of friends push id in it and update that document
        
        data.friends.push(id)
        console.log(data.friends)
        try {
            let dbData = await LookupFriendModel.findOneAndUpdate({ user_id }, data)
            res.send({status:"OK", message:"Friend Request Sent..."})
        } catch (e) {
            res.send({status:"ERR", message:"There is some error, pls try again letter"})
        }
    }
}

*/