var schema = require("js-schema");

var Device = schema({
  id: String,
  name: String,
  room: String,
  user: Number,
  type: String,
  attributes: Object,
  shadow: Object
})

module.exports.verifyHasAll = function(device) {
  return Device(device); //uses the above schema.
};
