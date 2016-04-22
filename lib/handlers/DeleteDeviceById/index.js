var iot = require('../../aws').iot;
var iotData = require('../../aws').iotData;
var dynamo = require('../../aws').DocumentClient;
var validator = require("../../deviceValidator");
var deviceHelper = require("../../deviceHelper");

exports.handler = function(id, event, callback) {

    if(event.id !== id) {
        callback(new Error("The id in the path and body do not match, are you sure you want to delete this thing?"));
        return;
    }

    var params = {
        TableName : 'HublessIot_devices',
        Key: {
            id: event.id
        }
    };

    dynamo.delete(params, function(err, data) {
        if (err) return callback(err);

        var params = {
            thingName: event.id /* required */
        };
        iot.deleteThing(params, function(err, data) {
            if (err) return callback(err);
            else callback(null,{status: "Success", payload: "The item was deleted successfully" });
        });
    });
};
