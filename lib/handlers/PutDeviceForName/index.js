console.log('Loading function');

var iot = require('../../aws').iot;

exports.handler = function(event, context) {
    if(!event.name) {
        context.error("Please provide a device name in the path.");
        return;
    }
    if(!event.device.attributes) {
        context.error("Please include an attributes key in your body.");
        return;
    }
    if(Object.keys(event.device.attributes).length > 3) {
        context.error("A thing can only have three keys. Please try again");
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
            //console.log("Error: " + err, err.stack); // an error occurred
            context.error("An error occurred querying from IOT. Please reformat your request");
            return;
        }
        //console.log("Payload : ", data);
        context.succeed({status: "Success", payload: data});
        return;
    });
};
