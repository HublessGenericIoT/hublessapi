var uuid = require('node-uuid');
var iot = require('../../aws').iot;

var Q = require("Q");

exports.handler = function(event) {
  return Q.Promise(function(resolve, reject, notify) {
    if(!event.name){
        reject(new Error("Please provide a device name in the body."));
        return;
    }
    if(!event.room){
        reject(new Error("Please provide a room name in the body."));
        return;
    }
    if(!event.type){
        reject(new Error("Please provide a device type in the body. Allowed types are: { light }"));
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
    resolve(iot.createThingPromised(params)
      .then(function(data) {
        return {
          status: "Success",
          payload: {
            thingName: data.thingName,
            mqttData: {
                url: require("./private").mqtt.url,
                username: require("./private").mqtt.username,
                password: require("./private").mqtt.password
            }
          }
        };
      })
    );
  });
};
