'use strict';
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var assert = require('assert');
var deviceValidator = require("../lib/deviceValidator");

describe("Utility Functions", function() {
  describe("Device Validator", function() {
    var device = {
      id: "b7aae05e-39e2-4385-85f4-a5914bc33d93",
      name: "David's Device",
      room: "Bedroom",
      user: 1,
      type: "light",
      attributes: {
        foo: "bar",
        bar: 1
      },
      shadow: {
        delta: {
          stuff: true
        }
      }
    }

    it("should validate a valid object", function() {
      assert.ok(deviceValidator.verifyHasAll(device),
        "should succeed on a full item");
    })

    it("verifyHasAll should fail without id.", function() {
      assert.equal(deviceValidator.verifyHasAll({
        name: "David's Device",
        room: "Bedroom",
        user: 1,
        type: "light",
        attributes: {
          foo: "bar",
          bar: 1
        },
        shadow: {
          delta: {
            stuff: true
          }
        }
      }), false, "should fail on an without an id");
    })
  })//end describe Device Validator.
})//end describe utils.
