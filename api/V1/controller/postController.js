const postModel = require('../model/Post')

let savePost = async (req, res) => {
    let { textContent, likes, dislikes } = req.body

    let newPost = new postModel({ textContent, likes, dislikes, user_id: req.decoded.id })
    newPost.save()
        .then(data => {
            console.log(data)
            res.send({ status: "OK", message: "post save successfully...", data: [data] })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "ERR", message: "post not saved...", data: [] })
        })
}

let getAllPost = async (req, res) => {

    let posts = []
    try {
        posts = await postModel.find({})
        console.log(posts)
    } catch (e) {

    }
    res.send({ status: "OK", message: "Success", data: [posts] })
}

module.exports = { savePost, getAllPost }