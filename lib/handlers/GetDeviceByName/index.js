var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;

var Q = require("Q");

exports.handler = function(event) {

  return Q.Promise(function(resolve, reject, notify) {
    if(!event.name) {
        reject(new Error("Please provide a device name in the path."));
        return;
    }
    var params = {
        thingName: event.name /* required */
    };
    resolve(iot.describeThingPromised(params)
    .then(function(thing) {
      var params = {
          thingName: event.name /* required */
      };
      return iotData.getThingShadowPromised(params)
      .then(function(data) {
        return {status: "Success", payload: {thing: thing, shadow: JSON.parse(data.payload)}}
      })
      .catch(function(err) {
        if(err.statusCode == 404) {
          return {status: "Success", payload: {thing: thing, shadow: {}}}
        }
      })
    }));
  });
};
