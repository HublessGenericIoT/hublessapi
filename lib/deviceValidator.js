var schema = require("js-schema");
var deviceSchema = {
  name: /[A-Za-z0-9-_.,:\/@#]+/,
  room: /[A-Za-z0-9-_.,:\/@#]+/,
  user: /[A-Za-z0-9-_.,:\/@#]+/,
  type: /[A-Za-z0-9-_.,:\/@#]+/, //this will not be saved now
  attributes: Object
}

var DeviceNoIdNoShadow = schema(deviceSchema);

deviceSchema.id = String;
var DeviceNoShadow = schema(deviceSchema);

deviceSchema.shadow = Object;
var Device = schema(deviceSchema);

module.exports.verifyHasAll = Device;
module.exports.verifyAllNoShadow = DeviceNoShadow;
module.exports.verifyNoIdNoShadow = DeviceNoIdNoShadow;
