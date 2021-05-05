const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    userLogin:String,
    gender:String,
    pwd:String,
    gender:String,
    dob:Date
},{timestamps:true})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel