'use strict';
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var assert = require('assert');
var createNewDevice = require('../lib/handlers/CreateNewDevice');
var getDeviceByName = require('../lib/handlers/GetDeviceByName');
var putDeviceForName = require('../lib/handlers/PutDeviceForName');

describe("Aws calls", function() {
  describe('CreateNewDevice', function () {
    // it("should create a simple object", function() {
    //   return createNewDevice.handler({
    //     "name": "test_" + Math.random(),
    //     "room": "MyLivingRoom",
    //     "type": "light"
    //   }).should.be.fulfilled
    //   .and.eventually.have.property("status");
    // });
    it("should have a private file with data", function() {
      var priv = require('../lib/handlers/CreateNewDevice/private');
      assert(priv, "Private file exists.")
      assert(priv.mqtt.url)
      assert(priv.mqtt.username)
      assert(priv.mqtt.password)
    })
    it("should require a name", function() {
      return createNewDevice.handler({
        "room": "MyLivingRoom",
        "type": "light"
      }).should.eventually.be.rejected;
    });
    it("should require a room", function() {
      return createNewDevice.handler({
        "name": "test_" + Math.random(),
        "type": "light"
      }).should.eventually.be.rejected;
    });
    it("should require a type", function() {
      return createNewDevice.handler({
        "name": "test_" + Math.random(),
        "room": "MyLivingRoom",
      }).should.eventually.be.rejected;
    });
  });

  describe("GetDeviceByName", function() {
    it("should complete normally", function() {
      return getDeviceByName.handler({
        name: "b7aae05e-39e2-4385-85f4-a5914bc33d93"
      })
      .should.be.fulfilled
      .and.eventually.have.property("status");
    });
  });

  describe("PutDeviceForName", function() {
    it("should complete normally", function() {
      putDeviceForName.handler({
        name: "b7aae05e-39e2-4385-85f4-a5914bc33d93",
        room: "DavidsRoom",
        type: "light"
      }).catch(function(err) {
        console.error(err);
      }).should.eventally.be.fulfilled
      .and.eventually.have.property("status");
    })
  })
})
