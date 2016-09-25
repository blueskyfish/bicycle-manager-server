/*
 * Temperature Monitor Server - https://github.com/blueskyfish/temperature-monitor-server.git
 *
 * Copyright (c) 2016 BlueSkyFish
 */

/**
 * Middleware handler for read the http header field and measure the request time.
 *
 * @module bicycle/middleware
 *
 * @requires bicycle/logger
 */

'use strict';

const logger     = require('app/logger').getLogger('bicycle.middleware');
const httpStatus = require('app/http-status');

var TOKEN_HEADER = 'x-bicycle-token';


/**
 * measureTime - Returns the middleware, that measure the time of every request.
 *
 * @return {Function} middleware function.
 */
module.exports.measureTime = function () {
  return function measureTimeMiddleware(req, res, next) {
    const startTime = Date.now();
    const url = req.originalUrl;
    next();
    logger.debug('request "', url, '" in ', Date.now() - startTime, ' ms');
  }
};

/**
 * Returns the middleware, that is check the http header.
 *
 * @return {Function} middleware for check the request header in the http header.
 */
module.exports.headerToken = function () {
  return function headerTokenMiddleware(req, res, next) {
    var url = req.originalUrl;
    var token = req.get(TOKEN_HEADER);
    if (!token || token === '') {
      // unknown or empty token
      res.status(httpStatus.UNAUTHORIZED)
        .send({
          status: 'error',
          message: 'missing the authentication token in the header',
          url: url
        });
      return;
    }
    req.token = token;
    logger.debug('"', url, '" token: ', token);
    next();
  }
};
