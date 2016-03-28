console.log('Loading function');

var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;

exports.handler = function(event, context) {

    if(!event.name) {
        context.error("Please provide a device name in the path.")
        return;
    }
    var params = {
        thingName: event.name /* required */
    };
    iot.describeThing(params, function(err, thing) {
        if (err) {
            //console.log("Error: " + err, err.stack); // an error occurred
            context.error("An error occured querying from IOT. Please reformat your request");
            return;
        }

        iotData.getThingShadow(params, function(err, data) {
            var shadow = {};
            //console.log("Data from the iotData sdk", data);
            if (err) {
                //console.log("An error occurred in the iotData api", err);
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
