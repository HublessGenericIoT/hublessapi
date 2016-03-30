'use strict';
var chai = require("chai");
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var assert = require('assert');
var createNewDevice = require('../lib/handlers/CreateNewDevice');
var getDeviceByName = require('../lib/handlers/GetDeviceByName');
var putDeviceForName = require('../lib/handlers/PutDeviceForName');
var getAllDevices = require('../lib/handlers/GetAllDevices');

describe("Aws calls", function() {
  describe('CreateNewDevice', function () {
    // it("should create a simple device", function() {
    //   return createNewDevice.handler({
    //     "name": "test_" + Math.random(),
    //     "room": "MyLivingRoom",
    //     "type": "light",
    //     "user": "0",
    //     "attributes": {
    //     }
    //   }).catch(function(data) {
    //     console.log(data)
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
    it("should fail for bad regex match", function(done) {
      createNewDevice.handler({
        name: "David's Device",
        room: "Bedroom",
        user: "0",
        type: "light",
        attributes: {
          foo: "bar",
          bar: 1
        }
      }, function(err, result) {
        assert.ok(err); //error should exist.
        done();
      })
    });

    it("should reject a shadow", function(done) {
      return createNewDevice.handler({
        name: "DavidsDevice",
        room: "Bedroom",
        user: "0",
        type: "light",
        attributes: {
          foo: "bar",
          bar: 1
        },
        shadow: {}
      }, function(err, result) {
        assert.ok(err); //error should exist.
        done();
      });
    });

    it("should not allow an id", function(done) {
      createNewDevice.handler({
        id: "12412-124-315-14124-124123",
        name: "DavidsDevice",
        room: "Bedroom",
        user: "0",
        type: "light",
        attributes: {
          foo: "bar",
          bar: 1
        }
      }, function(err, result) {
        assert.ok(err); //error should exist.
        done();
      })
    })

    it("should not allow a malformed object", function(done) {
      createNewDevice.handler({
        blerg: "foobar"
      }, function(err, result) {
        assert.ok(err); //error should exist.
        done();
      });
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
    it("should complete normally", function(done) {
      putDeviceForName.handler({
        id: "2c51f514-0aba-444b-81d9-eec49b8a6370",
        name: "DavidsDevice",
        room: "Bedroom",
        user: "0",
        type: "light",
        attributes: {}
      }, function(err, result) {
        if(err) {
          console.log("Error: " + err, err.stack);
          assert.fail(err);
          return done();
        }
        assert.ok(result);
        assert.equal(result.status, "Success");
        done();
      })
    })
    it("should error on a malformed request", function(done) {
      putDeviceForName.handler({
        lemon: "blerg"
      }, function(err, result) {
        if(err) {
          assert.ok(err);
          return done();
        }
        assert.fail(result, "Should not complete.");
        done();
      })
    })
  })

  describe("GetDeviceByName", function() {
    it("should complete successfully.", function(done) {
      getDeviceByName.handler({
        id: "2c51f514-0aba-444b-81d9-eec49b8a6370"
      }, function(err, result) {
        if(err) {
          assert.fail(err);
          return done();
        }
        assert.ok(result);
        assert.equal(result.status, "Success");
        done();
      });
    })
  })

  describe("GetAllDevices", function() {
    it("should complete normally with an array payload", function(done) {
      return getAllDevices.handler({}, function(err, result) {
        if(err) assert.fail(err);
        assert.ok(result);
        assert.equal(result.status, "Success");
        done();
      })
    })
  })
})
