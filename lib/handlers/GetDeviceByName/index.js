var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;
var dynamo = require('../../aws').DocumentClient;
var validator = require("../../deviceValidator");
var deviceHelper = require("../../deviceHelper");

exports.handler = function(event, callback) {

    if(!event.id) {
        callback(new Error("Please provide an id in the path of the request."));
        return;
    }

    var params = {
        TableName : 'HublessIot_devices',
        Key: {
            id: event.id
        }
    };


    dynamo.get(params, function(err, data) {
        if (err) return callback(err);
        console.log(data);
        var thing = data.Item;

        var params = {
            thingName: thing.id /* required */
        };
        iotData.getThingShadow(params, function(err, result) {
            if(err) {
                if(err.statusCode == 404) {
                    thing.shadow = {};
                    return callback(null, {status: "Success", payload: thing});
                } else {
                    return callback(new Error("Unexpected error communicating with aws" + err));
                }
            }
            thing.shadow = JSON.parse(data.payload);
            return callback(null, {status: "Success", payload: thing});
        })
    });
};
