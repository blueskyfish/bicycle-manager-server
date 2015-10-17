/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var _ = require('lodash');
var express = require('express');

var helper = require('./helper');
var logger = require('../logger').getLogger('server.router.battery');

var batteryProvider = require('./battery-provider');

var router = express.Router();

var TOKEN_HEADER = 'x-bicycle-token';

//
// Middlewares
//
router.use(tokenMiddleware_);

//
// Endpoints
//
router.get('/', getBatteryList_);
router.get('/:id', getBatteryEdit_);
router.get('/detail/:id', getBatteryDetail_);
router.post('/', saveNewBattery_);
router.put('/:id', saveModifiedBattery_);
router.delete('/:id', deleteBattery_);


module.exports = {

  getRouter: function () {
    return router;
  }

};



function tokenMiddleware_(req, res, next) {
  var url = req.url;
  var token = req.get(TOKEN_HEADER);
  if (!token || token === '') {
    return helper.sendError(res, helper.HTTP_LOGIN, {
      message: 'missing the login token!'
    });
  }
  req.token = token;
  logger.debug('"', url, '" token: ', token);
  next();
}

function getBatteryList_(req, res) {
  var token = req.token;

  batteryProvider.getBatteryList(token)
    .then(function (result) {
      helper.sendResult(res, {
        batteryList: result
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    });
}

function getBatteryDetail_(req, res) {
  var id = req.params.id;
  var token = req.token;

  batteryProvider.getBatteryDetail(token, id)
    .then(function (detail) {
      helper.sendResult(res, {
        battery: detail
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    });
}

function getBatteryEdit_(req, res) {
  var id = req.params.id;
  var token = req.token;

  batteryProvider.getBatteryEdit(token, id)
    .then(function (result) {
      helper.sendResult(res, {
        battery: result
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    });
}

function saveNewBattery_(req, res) {
  var token = req.token;
  var item = req.body;

  batteryProvider.insertBatteryItem(token, item)
    .then(function (id) {
      helper.sendResult(res, {
        id: id
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    });
}

function saveModifiedBattery_(req, res) {
  var id = req.params.id;
  var token = req.token;
  var item = req.body;

  batteryProvider.updateBatteryItem(token, id, item)
    .then(function (id) {
      helper.sendResult(res, {
        id: id
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    });
}

function deleteBattery_(req, res) {
  var id = req.params.id;
  var token = req.token;

  batteryProvider.deleteBatteryItem(token, id)
    .then(function (id) {
      helper.sendResult(res, {
        id: id
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    });
}

