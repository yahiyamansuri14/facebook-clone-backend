const express = require('express')
const bodyParser = require('body-parser')
require('./database/db')
const cors = require('cors')
const userRouter = require('./api/V1/router/user')
const postRouter = require('./api/V1/router/postRouter')
const app = express()
app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ extended: false }))


app.use('/v1/user',userRouter)
app.use('/v1/post',postRouter)





app.listen(3300,()=>{
    console.log("-------------------server is running---------------")
})