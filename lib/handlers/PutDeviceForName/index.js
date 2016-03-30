var iot = require('../../aws').iot;
var validator = require("../../deviceValidator");

exports.handler = function(event) {
  return new Promise(function(resolve, reject) {
    if(!event.id) {
        throw (new Error("Please provide a device id in the path."));
        return;
    }
    if(!validator.verifyAllNoShadow(event)) {
      throw new Error(validator.verifyAllNoShadow.errors(event));
      return;
    }

    var params = {
        attributePayload: { /* required */
            attributes: {
              room: event.room,
              user: event.user,
              name: event.name
            }
        },
        thingName: event.id /* required */
    };
    resolve(iot.updateThingPromised(params))
  })
  .then(function(data) {
    //console.log("Payload : ", data);
    return {status: "Success", payload: data};
  }).catch(function(err) {
    //console.log("Error: " + err, err.stack); // an error occurred
    //console.log("An error occurred querying from IOT. Please reformat your request"+ err, err.stack);
  })
}
