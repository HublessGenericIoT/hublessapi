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
	DynamoDB: new aws.DynamoDB({apiVersion: '2012-08-10'}),
	DocumentClient: new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'}),
	init: function(callback) {
		var params = {
			TableName : "HublessIot_devices",
			KeySchema: [
				{ AttributeName: "id", KeyType: "HASH"}  //Partition key
			],
			AttributeDefinitions: [
				{ AttributeName: "id", AttributeType: "N" }
			],
			ProvisionedThroughput: {
				ReadCapacityUnits: 5,
				WriteCapacityUnits: 2
			}
		};

		this.DynamoDB.createTable(params, function(err, data) {
			if (err) {
				console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
				return callback(err);
			} else {
				console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
				return callback(null, data);
			}
		});
	}
};
