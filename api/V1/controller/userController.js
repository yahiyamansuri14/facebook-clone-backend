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

let sentFriendRequest = async ( req,res ) =>{
     let sender_id = req.decoded.id
     let receiver_id = req.params.id
     console.log(sender_id, receiver_id)
     let result = await FriendHelper.checkInLookupFriend(sender_id, receiver_id)
     console.log('22222222222222222',result)
     if ( !result ){
        let newRequest = new LookupFriendModel({sender_id, receiver_id})
        newRequest.save()
                    .then(data=>{
                        console.log(data)
                        res.send({status:"OK", message:"Request Sent Successfully..."})
                    })
                    .catch(err => {
                        console.log(err)
                        res.send({ status:"ERR", message:"Request Failed"})
                    })
    }else{
        res.send({status:"ERR", message:"Friend Request Already Sent"})
    }
}

let acceptFriendRequest = async (req,res) =>{
    let receiver_id = req.decoded.id
    let sender_id =  req.params.id
    console.log(sender_id, receiver_id)
    res.send('ok')
}

let showFriendRequest = async (req,res) =>{
    let receiver_id = req.decoded.id
    console.log(receiver_id)
    LookupFriendModel.find({receiver_id})
                        .then(data =>{
                            console.log(data)
                            res.send({ status:"OK", message:"success", data:[data]})
                        })
                        .catch(err =>{
                            console.log(err)
                            res.send({ status:"ERR", message:"failed", data:[]})
                        })
    
}
module.exports = { login, register, sentOtp, getUserProfile, sentFriendRequest, acceptFriendRequest, showFriendRequest }