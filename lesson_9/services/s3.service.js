const S3 = require('aws-sdk/clients/s3');

const {configs} = require("../configs");
const {AWS_S3_BUCKET} = require("../configs/configs");


const BuketConfig = new S3({
    region: configs.AWS_S3_REGION,
    secretAccessKey: configs.AWS_S3_SECRET_KEY,
    accessKeyId: configs.AWS_S3_ACCESS_KEY
})


const uploadFile = async (file) => {
    return BuketConfig
        .upload({
            Bucket: AWS_S3_BUCKET,
            Key: 'file.jpg',
            ACL: "public-read",
            Body: new Buffer('bufer body')
        })
        .promise()
}

module.exports = {
    uploadFile
}