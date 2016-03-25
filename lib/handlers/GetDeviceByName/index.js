console.log('Loading function');

var aws = require('aws-sdk');
var iot = new aws.Iot();
var iotData = new aws.IotData({endpoint : "A2SJ249R53BDX8.iot.us-east-1.amazonaws.com"});
exports.handler = function(event, context) {

	if(!event.name) {
		context.fail("Please provide a device name in the path.")
	}
	var params = {
		thingName: event.name /* required */
	};
	iot.describeThing(params, function(err, thing) {
		if (err) {
			console.log("Error: " + err, err.stack); // an error occurred
			context.fail("An error occured querying from IOT. Please reformat your request");
			return;
		}

		iotData.getThingShadow(params, function(err, data) {
			var shadow = {};
			console.log("Data from the iotData sdk", data);
			if (err) {
				console.log("An error occurred in the iotData api", err);
				if(err.statusCode == 404) {
					shadow = {};
				}
				shadow = {};
			} else {
				shadow = JSON.parse(data.payload);
			}
			context.succeed({status: "Success", payload: {thing: thing, shadow: shadow}});
		});
	});
};
