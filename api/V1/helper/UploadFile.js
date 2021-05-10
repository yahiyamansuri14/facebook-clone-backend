const moment = require('moment')
const aws = require('aws-sdk')
const fs = require('fs')
let uploadFile = async (fileData) => {
    const s3 = new aws.S3({
        accessKeyId: "AKIAZ6KVHWZ5WQD3MF7L",
        secretAccessKey: "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"
    })
    var data_file = {}
    let uploadPath = 'E:\\senior-project\\backend\\diary\\uploads\\'
    let splitted = fileData.name.split(".")
    let fileExt = splitted[splitted.length - 1]
    let fileName = moment().unix() + "." + fileExt
    uploadPath += fileName
    let resToSent = null
    await fileData.mv(uploadPath)
    const uploadFileContent = fs.readFileSync(uploadPath)
    const params = {
        Bucket: 'geeksdoor-mern-jan-21',
        Key: fileName, // File name you want to save as in S3
        Body: uploadFileContent,
        ACL:'public-read'
    }
 
    resToSent = await s3.upload(params).promise()
    return resToSent.Location
  
}

module.exports = uploadFile