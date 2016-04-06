# The NEW Hubless API

All responses are wrapped in a 
````
{
status: String,
payload: {},
errorMessage: String
}
````

/users
````
[
{
id: String,
name: String
}
]
````

/users/:id/devices
````
[
{
id: String,
name: String,
room: String, //the room id of the room containing this device. This might be better to have the room be a container.
owner: String, //userid of the owner.
type: Enum, //the type of device this is. eg, light, switch, etc.
attributes {
    //variable attributes about the device. A description for example.
}
}
]
````

/users/:id/devices/:id
````
{
//a single device, as defined above.
}
````

/users/:id/devices/:id/metadata
````
{
id: String,
model: String //eg ESP8266, Arduino
version: String, //software version currently installed.
}
````

/users/:id/rooms
````
[
{
id: String, //the id of the room
name: String, //the name of the room.
devices: [
    //String list of ids of devices.
]
}
]
````
