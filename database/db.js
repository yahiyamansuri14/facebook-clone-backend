const mongoose = require('mongoose')
const DB_URL = "YOUR URL"
//connecting to remote mongo db database 
mongoose.connect(DB_URL, {useNewUrlParse:true,useUnifiedTopology: true}).then(con=>{
    console.log("database connected")
}).catch(err=>{
    console.log(err)
})
