console.log('Loading function');
var aws = require('../../aws');
var iot = new aws.Iot();
var iotData = new aws.IotData({endpoint : "A2SJ249R53BDX8.iot.us-east-1.amazonaws.com"});
var async = require('async');

exports.handler = function(event, context) {

    var params = {
        //   attributeName: 'STRING_VALUE',
        //   attributeValue: 'STRING_VALUE',
        //   maxResults: 0,
        //   nextToken: 'STRING_VALUE'
    };
    iot.listThings(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        //else     console.log(data);           // successful response
        var thingData = data;
        var shadowParams = {
            thingName: data.things[0].thingName /* required */
        };

        async.map(data.things, function map(thing, callback) {
            iotData.getThingShadow({thingName: thing.thingName}, function(err, data) {
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
                callback(null, {thing: thing, shadow: shadow});
            });
        }, function done(err, result) {
            if(err) {
                context.error("Something happened while gathering shadows and this request has failed")
            }
            //console.log("Sending data badk to client. Success");
            context.succeed({status: "Success", payload: result});
        })
    });
};
