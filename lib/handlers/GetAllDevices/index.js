var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;
var async = require('async');
var deviceHelper = require("../../deviceHelper");

exports.handler = function(event) {
  return new Promise(function(resolve, reject) {
    var params = {
        //   attributeName: 'STRING_VALUE',
        //   attributeValue: 'STRING_VALUE',
        //   maxResults: 0,
        //   nextToken: 'STRING_VALUE'
    };
    resolve(iot.listThingsPromised(params))
  }).then(function(things) {
    // thing = deviceHelper.convertFromAwsThing(thing);

    return new Promise(function(resolve, reject) {
      async.map(data.things, function map(thing, callback) {
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
              callback(null, thing);
          });
      }, function done(err, result) {
          if(err) {
              reject({status : "Error", payload: "The request failed when gathering shadows. Please try again"});
              return;
          }
          //console.log("Sending data badk to client. Success");
          resolve({status: "Success", payload: result});
      })
    })
  });
};
