'use strict';

var assert = require('assert');
var createNewDevice = require('../../lib/handlers/GetDeviceByName/index');

describe('CreateNewDeviceFunction', function () {
  it("should return a {status, payload} object", function(done) {
    createNewDevice.handler({
        "name": "b7aae05e-39e2-4385-85f4-a5914bc33d93" //random device from AWS console.
    },
    {
      succeed: function succeed(data) {
        assert.ok(data.status);
        assert.equal(data.status, "Success")
        assert.ok(data.payload);
        assert.equal(data.payload.thing.thingName, "b7aae05e-39e2-4385-85f4-a5914bc33d93");
        done();
      },
      error: function error(data) {
        assert(false, "It should not fail.")
        done();
      }
    });
  });
});
