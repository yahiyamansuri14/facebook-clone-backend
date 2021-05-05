const jwt = require('jsonwebtoken')
require('dotenv').config()
let checkToken = async ( req, res, next ) =>{
    let { token } = req.headers
    let decoded = null
    try{
        decoded = await jwt.verify( token, process.env.ACCESS_TOKEN_SECRET)
        req.decoded = decoded
    }catch(e){
        return res.send({status:"OK", message:"Invalid Authentications Token...",data:[]})
    }
    next()
}

module.exports = { checkToken }