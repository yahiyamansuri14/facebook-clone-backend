const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema({

        otp:String,
        userLogin:String
})

const otpModel = mongoose.model('Otp', otpSchema)
module.exports = otpModel