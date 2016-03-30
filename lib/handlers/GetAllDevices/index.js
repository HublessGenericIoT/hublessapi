var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;
var async = require('async');
var deviceHelper = require("../../deviceHelper");

exports.handler = function(event, callback) {
  var params = {
      //   attributeName: 'STRING_VALUE',
      //   attributeValue: 'STRING_VALUE',
      //   maxResults: 0,
      //   nextToken: 'STRING_VALUE'
  };
  iot.listThings(params, function(err, result) {
    async.map(result.things, function map(thing, cb) {
        thing = deviceHelper.convertFromAwsThing(thing);

        iotData.getThingShadow({thingName: thing.name}, function(err, data) {
            var shadow = {};
            //console.log("Data from the iotData sdk", data);
            if (err) {
                //console.log("An error occurred in the iotData api", err);
                if(err.statusCode == 404) {
                    //console.log("No shadow found for ", thing.thingName)
                    shadow = {};
                }
                shadow = {};
            } else {
                shadow = JSON.parse(data.payload);
            }
            thing.shadow = shadow;
            cb(null, thing);
        });
    }, function done(err, result) {
        if(err) {
            callback(true, {status : "Error", payload: "The request failed when gathering shadows. Please try again"});
            return;
        }
        //console.log("Sending data back to client. Success");
        callback(null, {status: "Success", payload: result});
    })
  });
};
