var iot = require('../../aws').iot;

exports.handler = function(event) {
  return new Promise(function(resolve, reject) {

    if(!event.name) {
        reject(new Error("Please provide a device name in the path."));
        return;
    }
    if(!event.device) {
      reject(new Error("Pease include a device object in your request."));
      return;
    }
    if(!event.device.attributes) {
        reject(new Error("Please include an attributes key in your body."));
        return;
    }
    if(Object.keys(event.device.attributes).length > 3) {
        reject(new Error("A thing can only have three keys. Please try again"));
        return;
    }
    var params = {
        attributePayload: { /* required */
            attributes: event.device.attributes
        },
        thingName: event.name /* required */
    };
    resolve(iot.updateThingPromised(params))
  })
  .then(function(data) {
    //console.log("Payload : ", data);
    return {status: "Success", payload: data};
  }).catch(function(err) {
    //console.log("Error: " + err, err.stack); // an error occurred
    console.log("An error occurred querying from IOT. Please reformat your request");
    return {status: "Error", payload: err}
  })
}
