console.log('Loading function');

var aws = require('aws-sdk');
var iot = new aws.Iot();

exports.handler = function(event, context) {
	if(!event.name) {
		context.fail("Please provide a device name in the path.");
		return;
	}
	if(!event.device.attributes) {
		context.fail("Please include an attributes key in your body.");
		return;
	}
	if(Object.keys(event.device.attributes).length > 3) {
		context.fail("A thing can only have three keys. Please try again")
		return;
	}
	var params = {
		attributePayload: { /* required */
			attributes: event.device.attributes
		},
		thingName: event.name /* required */
	};
	iot.updateThing(params, function(err, data) {
		if (err) {
			console.log("Error: " + err, err.stack); // an error occurred
			context.fail("An error occurred querying from IOT. Please reformat your request");
			return;
		}
		console.log("Payload : ", data);
		context.succeed({status: "Success", payload: data});
		return;
	});
};
