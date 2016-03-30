var schema = require("js-schema");
var deviceSchema = {
  name: /[A-Za-z0-9-_.,:\/@#]+/,
  room: /[A-Za-z0-9-_.,:\/@#]+/,
  user: /[A-Za-z0-9-_.,:\/@#]+/,
  type: /[A-Za-z0-9-_.,:\/@#]+/, //this will not be saved now
  attributes: Object
}
deviceSchema.id = null;
deviceSchema.shadow = null;
var DeviceNoIdNoShadow = schema(deviceSchema);

deviceSchema.id = String;
var DeviceNoShadow = schema(deviceSchema);

deviceSchema.shadow = Object;
var Device = schema(deviceSchema);

module.exports.verifyHasAll = Device;
module.exports.verifyAllNoShadow = function(data) {
  var props = ["id", "name", "room", "user", "type", "attributes"]
  for(var i = 0; i < props.length; i++) {
    if(props[i] in data) {
      continue;
    } else
      return false;
  }

  var restricted = ["shadow"];
  for(var i = 0; i < props.length; i++) {
    if(restricted[i] in data) {
      return false;
    }
  }

  return true;
};

module.exports.verifyNoIdNoShadow = function(data) {
  var props = ["name", "room", "user", "type", "attributes"];
  for(var i = 0; i < props.length; i++) {
    if(props[i] in data) {
      continue;
    } else
      return false;
  }

  var restricted = ["id", "shadow"];
  for(var i = 0; i < props.length; i++) {
    if(restricted[i] in data) {
      return false;
    }
  }

  return true;
};
