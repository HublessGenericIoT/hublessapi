'use strict';
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var assert = require('assert');
var createNewDevice = require('../../lib/handlers/CreateNewDevice/index');

describe('CreateNewDeviceFunction', function () {
  it("should create a simple object", function() {
    return createNewDevice.handler({
      "name": "test_" + Math.random(),
      "room": "MyLivingRoom",
      "type": "light"
    }).should.be.fulfilled
    .and.eventually.have.property("status");
  });
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
