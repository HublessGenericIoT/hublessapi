var encoder = require("./encoder");

module.exports.convertFromAwsThing = function(awsThing) {
  /*
  {
    "thing": {
      "thingName": "MQTTfx",
      "attributes": {}
    },
    "shadow": {}
  }
  */
  return {
    id: awsThing.thingName,
    name: encoder.decode(awsThing.attributes.name),
    room: encoder.decode(awsThing.attributes.room),
    user: encoder.decode(awsThing.attributes.user),
    type: "light", //this is defaulted right now.
    attributes: {
      //this empty, but available.
    }
  }
}
