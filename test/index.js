'use strict';

var assert = require('assert');
var hublessapi = require('../lib');

describe('hublessapi', function () {
  it('should have unit test!', function () {
    assert(true, "Has a basic test");
  });

  it("should be able to run an async test", function(done) {
    setTimeout(function() {
      done()
    }, 1000)
  });
});
