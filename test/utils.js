'use strict';
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var assert = require('assert');
var deviceValidator = require("../lib/deviceValidator");

describe("Utility Functions", function() {
  describe("Device Validator", function() {
    var device = {};
    beforeEach(function() {
      device = {
        name: "David's Device",
        room: "Bedroom",
        user: 1,
        type: "light",
        attributes: {
          foo: "bar",
          bar: 1
        }
      };
    });

    it("should validate a valid object", function() {
      device.id = "b7aae05e-39e2-4385-85f4-a5914bc33d93";
      device.shadow = {delta: {stuff: true}};
      assert.ok(deviceValidator.verifyHasAll(device),
        "should succeed on a full item");
    })

    it("verifyHasAll should fail without id.", function() {
      assert.equal(deviceValidator.verifyHasAll(device), false, "should fail on an without an id");
    });

    it("verifyNoIdNoShadow should work with valid object", function() {
      assert.ok(deviceValidator.verifyNoIdNoShadow(device));
    })

    it("verifyAllNoId should work with no shadow.", function() {
      device.id = "b7aae05e-39e2-4385-85f4-a5914bc33d93";
      assert.ok(deviceValidator.verifyAllNoShadow(device));
    })
  })//end describe Device Validator.
})//end describe utils.
