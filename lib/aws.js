var aws = require("aws-sdk");
aws.config = {
  region: "us-east-1",
  //logger: process.stdout
}

var awsPromised = require('aws-promised');

module.exports = {
  aws: awsPromised,
  iot: new awsPromised.iot(),
  iotData:  new awsPromised.iotData({endpoint : "A2SJ249R53BDX8.iot.us-east-1.amazonaws.com"}),
  DynamoDB: new AWS.DynamoDB({apiVersion: '2012-08-10'})
};
