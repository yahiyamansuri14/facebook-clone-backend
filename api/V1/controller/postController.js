const uploadFile = require('../helper/UploadFile')
const postModel = require('../model/Post')

let savePost = async (req, res) => {
    let { textContent, likes, dislikes } = req.body
    let { photo } = req.files

   let fileUrl = await uploadFile(photo)
  let newPost = new postModel({ textContent, likes, dislikes, user_id: req.decoded.id,fileUrl })
    newPost.save()
        .then(data => {
            res.send({ status: "OK", message: "post save successfully...", data: [data] })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "ERR", message: "post not saved...", data: [] })
        })
}

let getAllPost = async (req, res) => {
    console.log(req.body)
    let posts = []
    try {
        posts = await postModel.find({})
        console.log(posts)
    } catch (e) {

    }
    res.send({ status: "OK", message: "Success", data: [posts] })
}

let getAllPostByUserId = async (req,res) =>{
    console.log(req.params)
    let { id } = req.params
    let posts = []
    try{
        posts = await postModel.find({user_id:id})
    }catch(e){
        return res.send({status:"ERR", message:"there is some error", data:[]})
    }
    res.send({ status: "OK", message: "Success", data: [posts] })
    
}

let addLike = async (req, res) =>{
        
        let { id } = req.params
        let  data  = {}
        data = req.body
        console.log(data)
        try{
            let updated = await postModel.findOneAndUpdate( {_id:id,user_id:req.decoded.id}, data)
            console.log(updated)
            return  res.send({status:"OK",message:"Like added succefully", data:[updated]})
        }catch(e){
            return res.send({status:"ERR",message:"something went wrong!!!not able to like"})
        }
}

module.exports = { savePost, getAllPost, addLike, getAllPostByUserId }