var uuid = require('node-uuid');
var iot = require('../../aws').iot;
var dynamo = require('../../aws').DocumentClient;
var validator = require("../../deviceValidator");
var async = require("async");
var encoder = require("../../encoder");

exports.handler = function(event, finalcallback) {
	var newDeviceId = uuid.v4();

	if(!validator.verifyNoIdNoShadow(event)) {
		callback(new Error("check your body, invalid data in request."));
		return;
	}
	if(event.id) {
		callback(new Error("No id property is allowed"));
	}

	console.log(event);

	async.parallel({
		awsiot: function(callback) {
			//create a aws thing from a device object.
			var params = {
				attributePayload: { /* required */
					attributes: {
						name: encoder.encode(event.name),
						room: encoder.encode(event.room),
						user: encoder.encode(event.user)
					}
				},
				thingName: newDeviceId  /* required */
			};

			iot.createThing(params, function (err, data) {
				if(err) return callback(err, null);
				return callback(null, data);
			});
		},
		dynamo: function(callback) {
			var params = {
				TableName: "HublessIot_devices",
				Item: {
					"id":  newDeviceId,
					"name": event.name,
					"room": event.room,
					"user": event.user,
					"type": "light",
					"attributes": {}
				}
			};
			dynamo.put(params, function(err, data) {
				if (err) {
					console.error("Unable to add device", event.name, ". Error JSON:", JSON.stringify(err, null, 2));
					callback(err, null);
				} else {
					console.log("PutItem succeeded:", event.name);
					callback(null, params.Item);
				}
			});
		}
	}, function(err, result) {
		if(err) {
			console.log(err);
			return finalcallback(err, null);
		}
		return finalcallback(null, {
			status: "Success",
			payload: {
				id: result.awsiot.thingName,
				mqttData: {
					url: require("./private").mqtt.url,
					username: require("./private").mqtt.username,
					password: require("./private").mqtt.password
				}
			}
		});

	});
};
