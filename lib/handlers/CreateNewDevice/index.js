var uuid = require('node-uuid');
var iot = require('../../aws').iot;
var validator = require("../../deviceValidator");

exports.handler = function(event) {
  return new Promise(function(resolve, reject) {
    if(!validator.verifyNoIdNoShadow(event)) {
      reject(new Error(validator.verifyNoIdNoShadow.errors(event)));
      return;
    }
    if(event.id) {
      reject(new Error("No id property is allowed"))
    }

    var params = {
        attributePayload: { /* required */
            attributes: {
                name: event.name,
                room: event.room,
                user: event.user
            }
        },
        thingName: uuid.v4()  /* required */
    };
    return resolve(iot.createThingPromised(params))
  })
  .then(function(data) {
    return {
      status: "Success",
      payload: {
        id: data.thingName,
        mqttData: {
            url: require("./private").mqtt.url,
            username: require("./private").mqtt.username,
            password: require("./private").mqtt.password
        }
      }
    };
  })
};
