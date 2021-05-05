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
*/