###Create a device on AWS

Create a device on AWS

It will generate a uuid for the "DeviceName" and place the user specified name of the device in the attributes under "name" and the user's specified room by "roomName". Since an attribute cannot contain spaces, "RoomName" will be URL encoded so it can be decoded again for the user.

To call this method, POST to 

/devices

with the following body. 

````
{
    "name": "Light Bulb",
    "room": "Living Room",
    "type": "light", # or "switch"
    "capabilities" : [
    {
        "type": "passive",
        "data": "toggle",
        "name": "Light Status"
    },
    {
        "type": "passive",
        "data": "range",
        "range": {
            "low": 0,
            "high": 255
        },
        "name": "Red Light"
    }, 
    {
        "type": "passive", 
        "data": "enum", 

    }

    ]

````
Need a way to tell if it is a color picker so the app can shot it. 
On/Off and/or color
HEX data type. 


SSID includes "lightbulb" or device class. 


And the following will be returned

````
{
    
}
``````


## Current implementation

Currently the create endpoint takes an object with 

````
{
    name: "", 
    room: "",
    type: ""
}
````



## Contributing!!!

A file `private.js` is required in the root of this function to contain the url, u/n and password for the mqtt server the device should connect to. See `index.js` for usage and required fields.
