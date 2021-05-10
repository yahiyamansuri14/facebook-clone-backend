const UserModel = require('../model/User')
const FriendModel = require('../model/Friend')
const LookupFriendModel = require('../model/LookupFriend')
const FriendHelper = require('../helper/FriendHelper')
//need to import email module

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


let login = async (req, res) => {
    let { userLogin, pwd } = req.body
    /* console.log(userLogin,pwd) */
    let dbData = await UserModel.findOne({ userLogin })
    if (dbData != null) {
        let dbPwd = dbData['pwd']
        /* console.log(dbPwd) */
        let isSame = await bcrypt.compare(pwd, dbPwd)
        /* console.log(pwd,dbPwd) */
        let { _id, firstName, lastName, userLogin, gender, dob } = dbData
        let user = { _id, firstName, lastName, userLogin, gender, dob }
        /* console.log(dbData) */
        if (isSame) {
            const accessToken = await jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
            return res.send({ status: "OK", message: "login succesfull...", data: [user, { token: accessToken }] })
        } else {
            return res.send({ status: "ERR", message: "Invalid Email or Password" })
        }
    } else {
        return res.send({ status: "ERR", message: "Invalid Email or Password..." })
    }
}

let register = async (req, res) => {
    let { firstName, lastName, userLogin, pwd, gender, dob, otp } = req.body
    let password = await bcrypt.hash(pwd, 10)
    let otp_db
    UserModel.findOne({ userLogin }).then(async data => {
        if (data != null) {
            res.send({ status: "ERR", message: "user already exists" })
        } else {
            OtpModel.findOne({ userLogin: userLogin })
                .then(data => {
                    otp_db = data.otp
                    if (otp == otp_db) {
                        let newUser = new UserModel({ firstName, lastName, userLogin, gender, dob, pwd: password })
                        newUser.save()
                            .then(data => {
                                res.send({ status: "OK", msg: "data saved sucefully" })
                            })
                            .catch(err => {
                                res.send({ status: "ERR", msg: "signup un successfull" })
                            })

                    } else {
                        res.send({ status: "ERR" })
                    }
                })
                .catch(err => console.log('there is some errror'))
        }
    })
}

let sentOtp = (req, res) => {
    let { userLogin } = req.body
    console.log(userLogin)
    let otp = Math.floor(100000 + Math.random() * 900000)
    sendMail({ 'userLogin': userLogin, 'otp': otp })
    let newOtp = new OtpModel({ otp, userLogin })
    newOtp.save()
        .then(data => {
            res.send({ status: "OK", msg: "OTP sent successfully..." })
        })
        .catch(err => {
            console.log("otp sending failed")
            res.send({ status: "OK", msg: "there is some error,try after some time" })
        })
}

let getUserProfile = (req, res) => {
    let { id } = req.params
    UserModel.findOne({ _id: id })
        .then(dbData => {
            /* console.log(delete data['pwd'])
            console.log(data) */
            //  console.log(data)
            let { _id, firstName, lastName, userLogin, gender, dob } = dbData
            let user = { _id, firstName, lastName, userLogin, gender, dob }
            console.log(user)
            res.send({ status: "OK", message: "Profile Retrived Succefully", data: [user] })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "ERR", message: "Error while Retriving user profile", data: [] })
        })
}

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

let sentFriendRequest = async (req, res) => {
    let { id } = req.params
    let user_id = req.decoded.id

    let data = await LookupFriendModel.findOne({ user_id })
    /* console.log(data) */
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
        /* const friends = data.friends */
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

module.exports = { login, register, sentOtp, getUserProfile, accepFriendRequest, sentFriendRequest }