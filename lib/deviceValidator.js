module.exports.verifyHasAll = function(device) {
  const attributes = ["id", "name", "room", "type", "user", "attributes", "shadow"];
  for(var i = 0; i < attributes.length; i++) {
    if(!device.hasOwnProperty(attributes[i])) return false;
  }
  return true;
};
