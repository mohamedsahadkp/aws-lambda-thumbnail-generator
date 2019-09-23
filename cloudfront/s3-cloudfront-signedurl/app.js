const AWS = require('aws-sdk');

const cloudfrontAccessKeyId = "";
const cloudFrontPrivateKey = "";

const signer = new AWS.CloudFront.Signer(cloudfrontAccessKeyId, cloudFrontPrivateKey);
const twoDays = 2*24*60*60*1000;

const url = signer.getSignedUrl({
    url: 'https://cdn.example.com/file/1b62df45f152b7b6ff6478178dca7315.png',
    expires: Math.floor((Date.now() + twoDays)/1000), // Unix UTC timestamp for now + 2 days
});

console.log("SingedURL: " + url);