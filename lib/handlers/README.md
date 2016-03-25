# Hubless API

These lambda functions back the API for the project.

-----------

## The API

### /devices

#### POST



#### GET

Get all of the devices in the system. Returns a response in the form: 

````
{
    "status": "Success|Error Message", 
    "payload": [
    {
        "thing": {
            "thingName": "MQTTfx",
            "attributes": {}
        },
        "shadow": {}
    },
    //more devices
    ]
}
````

### /devices/{name}

#### GET

Used to get information about a specific device.

````
{
    status: "Success|Error message", 
    payload: {
        thing: {
            //thing
        },
        shadow: {

        }
    }
}
``````

#### PUT

## Contributing

All of these functions are deployed using grunt.

All lambda functions here are deployed to AWS using grunt. 
