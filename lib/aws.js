var aws = require('aws-sdk');

aws.config = {
  region: "us-east-1",
  //logger: process.stdout
}

module.exports = aws;
