const nodemailer = require('nodemailer')

//creates a trasnporter object
const trasnporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'micecate129@gmail.com',
        pass:'9893729155'
    }
})
var mailOption = {
    from:'micecate129@gmail.com',
    to:'',
    subject:'OTP for signup',
    text:''
}
sendMail = (data) =>{
    mailOption.to=data.userLogin
    var mailText = "your otp is"+data.otp
    mailOption.text = mailText
    trasnporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error)
        }else{
            console.log('email sent:-'+info)
        }
    })
}


module.exports = sendMail