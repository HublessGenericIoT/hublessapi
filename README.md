# hublessapi [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Api for the hubless

## Installation

```sh
$ npm install --save hublessapi
```

## The API Definition

The API that will be implemented by this app is described below.

### Models

#### A device

````
{
  id: //uuid that identifies the device.
  name: //human readable name of the device.
  room: //room that the device is in.
  user: //user that the device belongs to. (Currently this is >1 for a user device and 0 for a testing device.)
  type: //the class of device. enum{LIGHT, ...} Currently not supported.
  attributes: {
    //an arbitrary set of attributes attached to the device.
    //currently unsupported, but will be stored in dynamo.
  }
  shadow: {
    //data returned from getDeviceShadow. See AWS API for details.
  }
}
````

### /devices

#### POST

Request body:

````
{
  //a device object as defined above. (without the id attribute or schema attribute.)
}
````

Response body:

````
{
  status: "Success|Error",
  payload: {
    id: //the id of the created device.
    mqttData: {
      url: //the url to connect to the broker
      username: //the username to connect.
      password: //the password to connect.
    }
  }
}
````

#### GET

Get all of the devices in the system. Returns a response in the form:

a parameter `?user={userid}` can be provided to limit the devices returned. If not provided, it CURRENTLY defaults to 1. (aka user devices).

NOTE: This response will be paged if it is too long. Information about paging will be added later.

````
{
    "status": "Success|Error",
    "payload": {
        "devices": [], //array of devices
        "nextToken": "" //paging token.
    }
}
````

### /devices/{id}

#### GET

Used to get information about a specific device.

````
{
    status: "Success|Error",
    payload: {} //a single device, as defined above.
}
````

#### PUT

````
{
  //a device (with or without the id, but if given, the id must match)
  //the device referred to in the url will be updated to match what is given.
  //ALL DEVICE METADATA WILL BE ERASED IF OMITTED
  //NOTE: The Shadow IS NOT updated via this endpoint.
}
````

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
