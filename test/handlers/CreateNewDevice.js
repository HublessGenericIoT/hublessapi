'use strict';

var assert = require('assert');
var createNewDevice = require('../../lib/handlers/CreateNewDevice/index');

describe('CreateNewDeviceFunction', function () {
  it("should return a {status, payload} object", function(done) {
    createNewDevice.handler({
        "name": "test_" + Math.random(),
        "room": "MyLivingRoom",
        "type": "light"
    },
    {
      succeed: function succeed(data) {
        assert.ok(data.status);
        assert.ok(data.payload);
        done();
      },
      error: function error(data) {
        assert(false, "It should not fail.")
        done();
      }
    });
  });

  it("should require a name", function(done) {
    createNewDevice.handler({
        "room": "MyLivingRoom",
        "type": "light"
    },
    {
      succeed: function succeed(data) {
        assert(false, "It should not succeed");
        done();
      },
      error: function error(data) {
        assert(true, "It should fail.")
        done();
      }
    });
  });

  it("should require a room", function(done) {
    createNewDevice.handler({
        "name": "something",
        "type": "light"
    },
    {
      succeed: function succeed(data) {
        assert(false, "It should not succeed");
        done();
      },
      error: function error(data) {
        assert(true, "It should fail.")
        done();
      }
    });
  });


  it("should require a type", function(done) {
    createNewDevice.handler({
      "name": "something",
      "room": "MyLivingRoom",
    },
    {
      succeed: function succeed(data) {
        assert(false, "It should not succeed");
        done();
      },
      error: function error(data) {
        assert(true, "It should fail.")
        done();
      }
    });
  });
});
