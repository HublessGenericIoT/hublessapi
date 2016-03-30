var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;

var validator = require("../../deviceValidator");
var deviceHelper = require("../../deviceHelper");

exports.handler = function(event) {
  return new Promise(function(resolve, reject) {
    if(!event.id) {
      reject(new Error("Please provide an id in the path of the request."));
      return;
    }

    var params = {
        thingName: event.id /* required */
    };
    resolve(iot.describeThingPromised(params))
  }).then(function(thing) {
      //console.log(thing);
      thing = deviceHelper.convertFromAwsThing(thing);

      var params = {
          thingName: event.id /* required */
      };
      return new Promise(function( resolve, reject) {
        iotData.getThingShadowPromised(params)
          .then(function(data) {
            thing.shadow = JSON.parse(data.payload);
            resolve({status: "Success", payload: thing});
          })
          .catch(function(err) {
            if(err.statusCode == 404) {
              thing.shadow = {};
              resolve({status: "Success", payload: thing});
            } else {
              reject(new Error("Unexpected error communicating with aws" + err));
            }
          })
      })
    })
};
