# hublessapi [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Api for the hubless

## Installation

```sh
$ npm install --save hublessapi
```

## API Definition

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



## License

MIT © [David Tschida](davidtschida.com)


[npm-image]: https://badge.fury.io/js/hublessapi.svg
[npm-url]: https://npmjs.org/package/hublessapi
[travis-image]: https://travis-ci.org/HublessGenericIoT/hublessapi.svg?branch=master
[travis-url]: https://travis-ci.org/HublessGenericIoT/hublessapi
[daviddm-image]: https://david-dm.org/HublessGenericIoT/hublessapi.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/HublessGenericIoT/hublessapi
[coveralls-image]: https://coveralls.io/repos/HublessGenericIoT/hublessapi/badge.svg
[coveralls-url]: https://coveralls.io/r/HublessGenericIoT/hublessapi
