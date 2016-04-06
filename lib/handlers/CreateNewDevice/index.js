var uuid = require('node-uuid');
var iot = require('../../aws').iot;
var dynamo = require('../../aws').DynamoDB;
var validator = require("../../deviceValidator");
var async = require("async");
var encoder = require("../../encoder");
var async = require("async");

exports.handler = function(event, finalcallback) {
    var newDeviceId = uuid.v4();

    if(!validator.verifyNoIdNoShadow(event)) {
        callback(new Error("check your body, invalid data in request."));
        return;
    }
    if(event.id) {
        callback(new Error("No id property is allowed"))
    }

    async.parallel([
        function(callback) {
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
            });
        },
        function(callback) {

        }
    ], function(err, result) {
        console.log(err, result);


        return finalcallback(null, {
            status: "Success",
            payload: {
                id: data.thingName,
                mqttData: {
                    url: require("./private").mqtt.url,
                    username: require("./private").mqtt.username,
                    password: require("./private").mqtt.password
                }
            }
        });

    });
};
