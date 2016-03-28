console.log('Loading function');

var uuid = require('node-uuid');
var iot = require('../../aws').iot;

exports.handler = function(event, context) {

    if(!event.name){
        context.error("Please provide a device name in the body.");
        return;
    }
    if(!event.room){
        context.error("Please provide a room name in the body.");
        return;
    }
    if(!event.type){
        context.error("Please provide a device type in the body. Allowed types are: { light }");
        return;
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
    return iot.createThingPromised(params).then(function(data) {
        context.succeed({status: "Success", payload: {
            thingName: data.thingName,
            mqttData: {
                url: require("./private").mqtt.url,
                username: require("./private").mqtt.username,
                password: require("./private").mqtt.password
            }
        }});
        return;
    })
    .catch(function(err) {
      //console.log("Error: " + err, err.stack); // an error occurred
      context.error("An error occured querying from IOT. Please reformat your request. Most likely you have given an invalid value for a member. Member values must satisfy regular expression pattern: [a-zA-Z0-9_.,@/:#-]+");
      return;
    });
};
