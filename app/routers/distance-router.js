/**
 * bicycle-distance-report-server - https//github.com/blueskyfish/bicycle-distance-report-server
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
router.get('/', getDistanceList_);
router.post('/', saveNewDistance_);
router.put('/:id', saveModifiedDistance_);
router.delete('/:id', deleteDistance_);


module.exports = {

  getRouter: function () {
    return router;
  }

};

var SQL_SELECT_DISTANCE = [
  'SELECT `token`, `distance_id` AS distanceId, DATE_FORMAT(`date`, "%Y-%m-%d") AS date, ',
  '  distance, average_speed AS averageSpeed, range_distance AS rangeDistance ',
  'FROM `bicycle-distances` ',
  'WHERE `token` = {token} ',
  'ORDER BY `date` DESC ',
  'LIMIT 20'
].join('\n');

var SQL_INSERT_DISTANCE = [
  'INSERT INTO `bicycle-distances` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `distance` = {distance}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `range_distance` = {rangeDistance}'
].join('\n');

var SQL_UPDATE_DISTANCE = [
  'UPDATE `bicycle-distances` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `distance` = {distance}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `range_distance` = {rangeDistance} ',
  'WHERE `distance_id` = {distanceId} AND `token` = {token}'
].join('\n');

var SQL_DELETE_DISTANCE = [
  'DELETE FROM `bicycle-distances` ',
  'WHERE `distance_id` = {distanceId} AND `token` = {token}'
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

function getDistanceList_(req, res) {
  var values = {
    token: req.token
  };
  var conn = database.getConnection();
  database.query(SQL_SELECT_DISTANCE, values, conn)
    .then(function(result) {
      helper.sendResult(res, {
        distances: result
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

function saveNewDistance_(req, res) {
  var values = {
    token: req.token
  };
  var distance = req.body;
  var data = _.assign({}, values, distance);
  var conn = database.getConnection();

  database.query(SQL_INSERT_DISTANCE, data, conn)
    .then(function (result) {
      helper.sendResult(res, {
        distanceId: result.insertId || -1
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

function saveModifiedDistance_(req, res) {
  var distanceId = req.params.id;
  var values = {
    token: req.token,
    distanceId: distanceId
  };
  var distance = req.body;
  var data = _.assign({}, values, distance);
  var conn = database.getConnection();

  database.query(SQL_UPDATE_DISTANCE, data, conn)
    .then(function () {
      helper.sendResult(res, {
        distanceId: distanceId
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

function deleteDistance_(req, res) {
  var distanceId = req.params.id;
  var values = {
    token: req.token,
    distanceId: distanceId
  };
  var conn = database.getConnection();

  database.query(SQL_DELETE_DISTANCE, values, conn)
    .then(function () {
      helper.sendResult(res, {
        distanceId: distanceId
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
