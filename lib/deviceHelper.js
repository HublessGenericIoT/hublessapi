

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
    name: awsThing.attributes.name,
    room: awsThing.attributes.room,
    user: awsThing.attributes.user,
    type: "light", //this is defaulted right now.
    attributes: {
      //this empty, but available.
    }
  }
}
