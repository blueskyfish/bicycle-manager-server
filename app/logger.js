/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var factory = require('bluesky-logger');

var fileAppender = require('./file-appender');
var settings = require('./settings');

switch (settings.mode()) {
  case 'local':
    factory
      .config({
        'root': 'debug'
      })
      .setSeparator('.');
    break;
  case 'test':
    factory
      .config({
        'root': 'info'
      })
      .setSeparator('.');
    break;
  default:
    // other running mode.
    factory
      .config({
        'root': 'info',
        'server': 'config'
      })
      .setSeparator('.')
      .setWriter(function (logName, message) {
        fileAppender.appendMessage(logName, message);
      });
    break;
}

var logger = factory.getLogger('server.logger');

module.exports = {

  getLogger: function (namePath) {
    return factory.getLogger(namePath);
  },

  loggerMiddleware: function (req, res, next) {
    _loggerMiddleware(req, res, next);
  }
};

function _loggerMiddleware(req, res, next) {
  if (!logger.isDebugEnabled()) {
    next();
    return;
  }
  var url = req.url;
  var method = req.method;
  var startTime = Date.now();
  var status;
  try {
    next();
    status = 'success';
  } catch (e) {
    logger.info('"', method, ': ', url, '" error "', e.message, '"');
    status = 'failed';
  } finally {
    var duration = Date.now() - startTime;
    logger.debug('"', method, ': ', url, '" in ', duration, ' ms (', status, ')');
  }
}
