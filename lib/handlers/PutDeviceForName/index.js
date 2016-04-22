var iot = require('../../aws').iot;
var validator = require("../../deviceValidator");
var encoder = require("../../encoder");
var dynamo = require('../../aws').DocumentClient;

exports.handler = function(id, event, callback) {
    if(!id) {
        callback(new Error("Please provide a device id in the path."));
        return;
    }

    if(id != event.id) {
        callback(new Error("Are you sure you want to change that device? Check your ids."));
        return;
    }

    /*if(!validator.verifyAllNoShadow(event)) {*/
    //callback(new Error("check your body, invalid data in request."));
    //return;
    /*}*/

    var params = {
        TableName : 'HublessIot_devices',
        Item: {
            id: event.id,
            room: event.room,
            user: event.user,
            type: event.type,
            name: event.name
        }
    };

    dynamo.put(params, function(err, data) {
        if(err) callback(err);
        else callback(null, {status: "Success", payload: "The item was updated successfully"});
    });
};
