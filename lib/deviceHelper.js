

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
    id: awsThing.thing.thingName,
    name: awsThing.thing.attributes.name,
    room: awsThing.thing.attributes.room,
    user: awsThing.thing.attributes.user,
    type: "light", //this is defaulted right now.
    attributes: {
      //this empty, but available.
    }
  }
}
