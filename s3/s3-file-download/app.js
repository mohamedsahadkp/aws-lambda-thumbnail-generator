var aws = require('aws-sdk');
var s3 = new aws.S3({ accessKeyId: '', secretAccessKey: '' });

var params = {Bucket: '', Key: 'c02a0c35-ce57-4c97-8826.wav'};
var file = require('fs').createWriteStream('/home/sahad/tmp/file.wav');
s3.getObject(params).createReadStream().pipe(file);