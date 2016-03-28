'use strict';

var assert = require('assert');
var getAllDevices = require('../../lib/handlers/GetAllDevices/index');

describe('GetAllDevicesFunction', function () {
  it("should return a {status, payload} object", function(done) {
    getAllDevices.handler({
    },
    {
      succeed: function succeed(data) {
        assert.ok(data, "It should return something.")
        assert.ok(data.status);
        assert.ok(data.payload);
        done();
      },
      error: function error(data) {
        assert(false, "It should not fail.")
        done();
      }
    });
  })
});
