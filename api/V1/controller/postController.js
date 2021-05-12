const uploadFile = require('../helper/UploadFile')
const postModel = require('../model/Post')

let savePost = async (req, res) => {
    let { textContent, likes, dislikes } = req.body
    let { photo } = req.files

    let fileUrl = await uploadFile(photo)
    let newPost = new postModel({ textContent, likes, dislikes, user_id: req.decoded.id, fileUrl })
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

let getAllPostByUserId = async (req, res) => {
    console.log(req.params)
    let { id } = req.params
    let posts = []
    try {
        posts = await postModel.find({ user_id: id })
    } catch (e) {
        return res.send({ status: "ERR", message: "there is some error", data: [] })
    }
    res.send({ status: "OK", message: "Success", data: [posts] })

}


let deletePostById = async (req, res) => {
    let { id } = req.params
    let user_id = req.decoded._id
    try {
        let data = await postModel.deleteOne({ _id: id, user_id })
        console.log(data)
        return res.send({ status: "OK", message: "post deleted" })
    } catch (e) {
        return res.send({ status: "ERR", message: "there is some error try letter" })
    }
}

let likePost = async (req, res) => {
    let { id } = req.params
    let user_id = req.decoded.id
    //find if user already liked post or not if yes then do not increment the value of like
    let post = await postModel.findOne({ _id: id })
    let likes_person = post.likes_person
    let likes = post.likes
    //if likes is 0 means its the first like , create an array of likes_person add this user id in it
    console.log(likes_person)
    console.log(likes)
    if (likes == 0) {
        likes_person.push(user_id)
        likes = parseInt(likes + 1)
        await postModel.update(
            { _id: id },
            {
                $set: {
                    likes: likes,
                    likes_person: likes_person
                }
            }).then(data => {
                //ask sir why data is different 
                res.send({ status: "OK", message: "Success", data: [data] })
            }).catch(err => {
                console.log(err)
                res.send({ status: "ERR", message: "try again letter", data: [] })
            })
    } else {
        //if likes is not equal to zero it means it's not the first like so get the likes_person array 
        //find if the user already likes post if yes then do not increase the like...
        //if user doesn't liked the post already then increate the like by one


        //check if user has already likes post or not if yes then do nothing just send already liked in response
        let result = likes_person.filter(element => {
            //console.log('in filter',element)
            if (element == user_id)
                return element
        })
        if (result.length > 0) {
            //user already liked post
            res.send({ status: "OK", message: "post already liked" })
        } else {
            //post is not liked 
            //push user_id in likes_person array and increase like by one
            likes_person.push(user_id)
            likes = parseInt(likes + 1)
            await postModel.update(
                { _id: id },
                {
                    $set: {
                        likes: likes,
                        likes_person: likes_person
                    }
                }).then(data => {
                    //ask sir why data is different 
                    res.send({ status: "OK", message: "Success", data: [data] })
                }).catch(err => {
                    console.log(err)
                    res.send({ status: "ERR", message: "try again letter", data: [] })
                })

        }
    }

}
module.exports = { savePost, getAllPost, getAllPostByUserId, deletePostById, likePost }