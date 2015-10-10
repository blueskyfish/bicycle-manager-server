/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var _ = require('lodash');
var express = require('express');

var database = require('../database');
var helper = require('./helper');
var logger = require('../logger').getLogger('server.router.distance');

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
router.post('/', saveNewBattery_);
router.put('/:id', saveModifiedBattery_);
router.delete('/:id', deleteBattery_);


module.exports = {

  getRouter: function () {
    return router;
  }

};

var SQL_SELECT_DISTANCE = [
  'SELECT `id`, ',
  '  DATE_FORMAT(`date`, "%Y-%m-%d") AS date, ',
  '  `mileage`, ',
  '  `average_speed` AS averageSpeed,' +
  '  `distance` ',
  'FROM `bicycle-battery` ',
  'WHERE `token` = {token} ',
  'ORDER BY `date` DESC ',
  'LIMIT 21'
].join('\n');

var SQL_INSERT_DISTANCE = [
  'INSERT INTO `bicycle-battery` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `mileage` = {mileage}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `distance` = {distance}'
].join('\n');

var SQL_UPDATE_DISTANCE = [
  'UPDATE `bicycle-battery` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `mileage` = {mileage}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `distance` = {distance} ',
  'WHERE `id` = {id} AND `token` = {token}'
].join('\n');

var SQL_DELETE_DISTANCE = [
  'DELETE FROM `bicycle-bicycle` ',
  'WHERE `id` = {id} AND `token` = {token}'
].join('\n');


function tokenMiddleware_(req, res, next) {
  var url = req.url;
  var token = req.get(TOKEN_HEADER);
  if (!token || token === '') {
    return helper.sendError(res, helper.HTTP_LOGIN, {
      message: 'missing the login token"!'
    });
  }
  req.token = token;
  logger.debug('"', url, '" token: ', token);
  next();
}

function getBatteryList_(req, res) {
  var values = {
    token: req.token
  };
  var conn = database.getConnection();
  database.query(SQL_SELECT_DISTANCE, values, conn)
    .then(function(result) {
      helper.sendResult(res, {
        batteryList: result
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    })
    .fin(function () {
      conn.end();
      logger.debug('list: close connection');
    });
}

function saveNewBattery_(req, res) {
  var values = {
    token: req.token
  };
  var batteryItem = req.body;
  var data = _.assign({}, values, batteryItem);
  var conn = database.getConnection();

  database.query(SQL_INSERT_DISTANCE, data, conn)
    .then(function (result) {
      helper.sendResult(res, {
        id: result.insertId || -1
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    })
    .fin(function () {
      conn.end();
      logger.debug('save new: close connection');
    });
}

function saveModifiedBattery_(req, res) {
  var id = req.params.id;
  var values = {
    token: req.token,
    id: id
  };
  var batteryItem = req.body;
  var data = _.assign({}, values, batteryItem);
  var conn = database.getConnection();

  database.query(SQL_UPDATE_DISTANCE, data, conn)
    .then(function () {
      helper.sendResult(res, {
        distanceId: id
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    })
    .fin(function () {
      conn.end();
      logger.debug('save mod: close connection');
    });
}

function deleteBattery_(req, res) {
  var id = req.params.id;
  var values = {
    token: req.token,
    id: id
  };
  var conn = database.getConnection();

  database.query(SQL_DELETE_DISTANCE, values, conn)
    .then(function () {
      helper.sendResult(res, {
        id: id
      });
    },
    function (reason) {
      helper.sendError(res, helper.HTTP_ERROR, {
        reason: reason
      });
    })
    .fin(function () {
      conn.end();
      logger.debug('delete: close connection');
    });
}


function _prepareBatteryList(batterList) {
  var items = [];
  var prevItem;
  _.forEach(batterList, function (batteryItem) {

  })
}