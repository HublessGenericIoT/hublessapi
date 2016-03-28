console.log('Loading function');

var uuid = require('node-uuid');
var aws = require('../../aws');
var iot = new aws.Iot();

exports.handler = function(event, context) {

    if(!event.name){
        context.error("Please provide a device name in the body.");
    }
    if(!event.room){
        context.error("Please provide a room name in the body.");
    }
    if(!event.type){
        context.error("Please provide a device type in the body. Allowed types are: { light }");
    }

    var params = {
        attributePayload: { /* required */
            attributes: {
                name: event.name,
                room: event.room,
                type: event.type
            }
        },
        thingName: uuid.v4()  /* required */
    };
    iot.createThing(params, function(err, data) {
        if (err) {
            //console.log("Error: " + err, err.stack); // an error occurred
            context.error("An error occured querying from IOT. Please reformat your request. Most likely you have given an invalid value for a member. Member values must satisfy regular expression pattern: [a-zA-Z0-9_.,@/:#-]+");
            return;
        }
        context.succeed({status: "Success", payload: {
            thingName: data.thingName,
            mqttData: {
                url: require("./private").mqtt.url,
                username: require("./private").mqtt.username,
                password: require("./private").mqtt.password
            }
        }});
        return;
    });
};
