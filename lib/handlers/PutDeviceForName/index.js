var iot = require('../../aws').iot;
var validator = require("../../deviceValidator");

exports.handler = function(id, event, callback) {
  if(!id) {
      callback(new Error("Please provide a device id in the path."));
      return;
  }

  if(id != event.id) {
    callback(new Error("Are you sure you want to change that device? Check your ids."));
    return;
  }

  /*if(!validator.verifyAllNoShadow(event)) {*/
    //callback(new Error("check your body, invalid data in request."));
    //return;
  /*}*/

  var params = {
      attributePayload: { /* required */
          attributes: {
            room: event.room,
            user: event.user,
            name: event.name
          }
      },
      thingName: id /* required */
  };
  iot.updateThing(params, function(err, result) {
    if(err) callback(err);
    else callback(null, {status: "Success", payload: result});
  })
}
