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
    it("should create a simple object", function() {
      return createNewDevice.handler({
        "name": "test_" + Math.random(),
        "room": "MyLivingRoom",
        "type": "light",
        "user": "0",
        "attributes": {
        }
      }).catch(function(data) {
        console.log(data)
      }).should.be.fulfilled
      .and.eventually.have.property("status");
    });
    it("should have a private file with data", function() {
      var priv = require('../lib/handlers/CreateNewDevice/private');
      assert(priv, "Private file exists.")
      assert(priv.mqtt.url)
      assert(priv.mqtt.username)
      assert(priv.mqtt.password)
    })
    it("should fail for bad regex match", function() {
      return createNewDevice.handler({
        name: "David's Device",
        room: "Bedroom",
        user: "0",
        type: "light",
        attributes: {
          foo: "bar",
          bar: 1
        }
      }).should.eventually.be.rejected.and.have.property("status").equal("Error");
    });

    // it("should reject a shadow", function() {
    //   return createNewDevice.handler({
    //     name: "DavidsDevice",
    //     room: "Bedroom",
    //     user: "0",
    //     type: "light",
    //     attributes: {
    //       foo: "bar",
    //       bar: 1
    //     },
    //     shadow: {}
    //   }).should.eventually.be.rejected.and.have.property("status").equal("Error");
    // });

    it("should not allow an id", function() {
      return createNewDevice.handler({
        id: "12412-124-315-14124-124123",
        name: "DavidsDevice",
        room: "Bedroom",
        user: 0,
        type: "light",
        attributes: {
          foo: "bar",
          bar: 1
        }
      }).should.eventually.be.rejected.and.have.property("status").equal("Error");
    })
  });

  // describe("GetDeviceByName", function() {
  //   it("should complete normally", function() {
  //     return getDeviceByName.handler({
  //       name: "b7aae05e-39e2-4385-85f4-a5914bc33d93"
  //     })
  //     .should.be.fulfilled
  //     .and.eventually.have.property("status");
  //   });
  // });

  describe("PutDeviceForName", function() {
    it("should complete normally", function() {
      putDeviceForName.handler({
        name: "thingy",
        device: {
          attributes: {
            room : "DavidsRoom",
            type: "light"
          }
        }
      }).should.eventually.be.fulfilled
      .and.have.property("status");
    })
    it("should error on a malformed request", function() {
      putDeviceForName.handler({
        lemon: "blerg"
      }).should.eventually.be.rejected;
    })
  })

  describe("GetDeviceByName", function() {
    it("should complete successfully.", function() {
      getDeviceByName.handler({
        id: "2c51f514-0aba-444b-81d9-eec49b8a6370"
      }).should.eventually.be.fulfilled.and.equal({
        status: "Success",
        payload: {
          id: "2c51f514-0aba-444b-81d9-eec49b8a6370",
          name: "DavidsDevice",
          room: "Bedroom",
          user: "0",
          type: "light",
          attributes: {},
          shadow: {}
        }
      })
    })
  })
})
