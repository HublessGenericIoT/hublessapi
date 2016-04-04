'use strict';
var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

var createNewDevice = require('../lib/handlers/CreateNewDevice');
var getDeviceByName = require('../lib/handlers/GetDeviceByName');
var putDeviceForName = require('../lib/handlers/PutDeviceForName');
var getAllDevices = require('../lib/handlers/GetAllDevices');

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

router.get("/devices", function (req, res, next) {
  getAllDevices.handler({}, req.query, function basicResponder(err, result) {
    if(err) {
      console.log(err);
      if(err.status && err.status === "Error" && err.errorMessage) //if it is an error we planned for.
        res.status(400).send(err);
      else //don't pass system errors to the client.
        res.status(400).send({status: "Error", errorMessage: "There was an error processing your request."});
    }
    else {
        console.log(result.payload.length);
        res.send(result);
    }
  });
})

router.post("/devices", function(req, res, next) {
  createNewDevice.handler(req.body, function basicResponder(err, result) {
    if(err) {
      console.log(err);
      if(err.status && err.status === "Error" && err.errorMessage) //if it is an error we planned for.
        res.status(400).send(err);
      else //don't pass system errors to the client.
        res.status(400).send({status: "Error", errorMessage: "There was an error processing your request."});
    }
    else res.send(result);
  });
})

router.get("/devices/:id", function(req, res, next) {
  getDeviceByName.handler({id: req.params.id}, function basicResponder(err, result) {
    if(err) {
      console.log(err);
      if(err.status && err.status === "Error" && err.errorMessage) //if it is an error we planned for.
        res.status(400).send(err);
      else //don't pass system errors to the client.
        res.status(400).send({status: "Error", errorMessage: "There was an error processing your request."});
    }
    else res.send(result);
  });
})

router.put("/devices/:id", function(req, res, next) {
  putDeviceForName.handler(req.params.id, req.body, function basicResponder(err, result) {
    if(err) {
      console.log(err);
      if(err.status && err.status === "Error" && err.errorMessage) //if it is an error we planned for.
        res.status(400).send(err);
      else //don't pass system errors to the client.
        res.status(400).send({status: "Error", errorMessage: "There was an error processing your request."});
    }
    else res.send(result);
  });
})


app.use(router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
