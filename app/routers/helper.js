/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var _ = require('lodash');

var HTTP_OKAY = 200;
var HTTP_ERROR = 400;
var HTTP_LOGIN = 401;

var RESULT_TEMPLATE = {
  status: 'okay'
};

var ERROR_TEMPLATE = {
  status: 'error'
};

module.exports = {

  sendResult: function (res, data) {
    sendResult_(res, data);
  },

  sendError: function (res, status, data) {
    sendError_(res, status, data);
  },

  HTTP_OKAY: HTTP_OKAY,
  HTTP_ERROR: HTTP_ERROR,
  HTTP_LOGIN: HTTP_LOGIN
};

function sendResult_(res, data) {
  var result = _.assign({}, RESULT_TEMPLATE, data);
  res.send(result);
}

function sendError_(res, status, data) {
  var result = _.assign({}, ERROR_TEMPLATE, data);
  res.status(status).send(result);
}
