const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://yahiyamansuri:Mongo1998@yahiya-cluster.hjixa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//connecting to remote mongo db database 
mongoose.connect(DB_URL, {useNewUrlParse:true,useUnifiedTopology: true}).then(con=>{
    console.log("database connected")
}).catch(err=>{
    console.log(err)
})
