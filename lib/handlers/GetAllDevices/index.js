var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;
var async = require('async');
var deviceHelper = require("../../deviceHelper");
var dynamo = require('../../aws').DocumentClient;

exports.handler = function(event, options, callback) {

	console.log(options);

	//Establish parametars
	var iotparams = {};
	if(options.nextToken) {
		iotparams.nextToken = options.nextToken;
	}
	/*    if(options.user) {*/
	//iotparams.attributeName = "user";
	//iotparams.attributeValue = options.user;
	//} else {
	//iotparams.attributeName = "user";
	//iotparams.attributeValue = "1"; //default the query to real devices. Any other query will overwrite this.
	//}

	//if(options.type) {
	//iotparams.attributeName = "type";
	//iotparams.attributeValue = options.type;
	//}
	//if(options.room) {
	//iotparams.attributeName = "room";
	//iotparams.attributeValue = options.room;
	//}

	//var params = {
	//   attributeName: 'STRING_VALUE',
	//   attributeValue: 'STRING_VALUE',
	//maxResults: 100,
	//   nextToken: 'STRING_VALUE'
	//};


	var params = {
		TableName: "HublessIot_devices",
		ExclusiveStartKey: options.nextToken
		//ProjectionExpression: "",
		//FilterExpression: "",
		//ExpressionAttributeNames: {
		//"#yr": "year",
		//},
		//ExpressionAttributeValues: {
		//":start_yr": 1950,
		//":end_yr": 1959
		//}
	};

	console.log("Scanning Movies table.");
	dynamo.scan(params, onScan);

	function onScan(err, data) {
		if (err) {
			console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			async.map(data.Items, function map(thing, cb) {

				iotData.getThingShadow({thingName: thing.id}, function(err, data) {
					var shadow = {};
					//console.log("Data from the iotData sdk", data);
					if (err) {
						//console.log("An error occurred in the iotData api", err);
						if(err.statusCode == 404) {
							//console.log("No shadow found for ", thing.thingName)
							shadow = {};
						}
						shadow = {};
					} else {
						shadow = JSON.parse(data.payload);
					}
					thing.shadow = shadow;
					cb(null, thing);
				});
			}, function done(err, shadowedresult) {
				if(err) {
					callback({status : "Error", errorMessage: "The request failed when gathering shadows. Please try again"}, null);
					return;
				}
				//console.log("Sending data back to client. Success");
				callback(null, {status: "Success", payload: { devices: shadowedresult, nextToken: data.LastEvaluatedKey } });
			});

			// continue scanning if we have more movies
			if (typeof data.LastEvaluatedKey != "undefined") {
				console.log("Scanning for more...");
				params.ExclusiveStartKey = data.LastEvaluatedKey;
				docClient.scan(params, onScan);
			}
		}
	}
};
