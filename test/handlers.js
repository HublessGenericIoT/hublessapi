'use strict';
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var assert = require('assert');
var createNewDevice = require('../lib/handlers/CreateNewDevice/index');
var getDeviceByName = require('../lib/handlers/GetDeviceByName/index');
var putDeviceForName = require('../lib/handlers/PutDeviceForName/index');

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
      }).should.be.fulfilled
      .and.eventually.have.property("status");
    })
  })
})
