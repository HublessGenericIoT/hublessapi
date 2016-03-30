var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;

var validator = require("../../deviceValidator");
var deviceHelper = require("../../deviceHelper");

exports.handler = function(event) {
  return new Promise(function(resolve, reject) {
    if(!event.id) {
      return reject({
        status: "Error",
        payload: "Please provide an id in the path of the request."
      });
    }

    var params = {
        thingName: event.id /* required */
    };
    resolve(iot.describeThingPromised(params))
  }).then(function(thing) {

      thing = deviceHelper.convertFromAwsThing(thing);

      var params = {
          thingName: event.name /* required */
      };
      return iotData.getThingShadowPromised(params)
        .then(function(data) {
          thing.shadow = JSON.parse(data.payload);
          return {status: "Success", payload: thing}
        })
        .catch(function(err) {
          if(err.statusCode == 404) {
            thing.shadow = {};
            throw {status: "Success", payload: thing};
          } else {
            throw {status: "Error", payload: err};
          }
        })
    })
};
