var iot = require('../../aws').iot;
var Q = require("Q");

exports.handler = function(event, context) {
  return Q.Promise(function(resolve, reject, notify) {
    if(!event.name) {
        reject(new Error("Please provide a device name in the path."));
    }
    if(!event.device) {
      reject(new Error("Pease include a device object in your request."));
    }
    if(!event.device.attributes) {
        reject(new Error("Please include an attributes key in your body."));
    }
    if(Object.keys(event.device.attributes).length > 3) {
        reject(new Error("A thing can only have three keys. Please try again"));
    }
    var params = {
        attributePayload: { /* required */
            attributes: event.device.attributes
        },
        thingName: event.name /* required */
    };
    resolve(iot.updateThingPromised(params)
      .then(function(data) {
        //console.log("Payload : ", data);
        return {status: "Success", payload: data};
      }).catch(function(err) {
        //console.log("Error: " + err, err.stack); // an error occurred
        this.reject("An error occurred querying from IOT. Please reformat your request");
        return;
      })
    )
  })
};
