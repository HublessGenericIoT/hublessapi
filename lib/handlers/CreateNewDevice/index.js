var uuid = require('node-uuid');
var iot = require('../../aws').iot;
var validator = require("../../deviceValidator");
var async = require("async");
var encoder = require("../../encoder");

exports.handler = function(event, callback) {

  if(!validator.verifyNoIdNoShadow(event)) {
    callback(new Error("check your body, invalid data in request."));
    return;
  }
  if(event.id) {
    callback(new Error("No id property is allowed"))
  }

  //create a aws thing from a device object.
  var params = {
      attributePayload: { /* required */
          attributes: {
              name: encoder.encode(event.name),
              room: encoder.encode(event.room),
              user: encoder.encode(event.user)
          }
      },
      thingName: uuid.v4()  /* required */
  };

  iot.createThing(params, function (err, data) {
    if(err) return callback(err, null);
    else return callback(null, {
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
