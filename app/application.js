/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var bodyParse = require('body-parser');
var express = require('express');

var settings = require('./settings');
var factory = require('./logger');

var about = require('./routers/about');
var distance = require('./routers/battery-router');

var logger = factory.getLogger('server.main');

var app = express();

//
// Middleware
//
app.use(bodyParse.json());
app.use(factory.loggerMiddleware);

//
// Router Endpoints
//
app.use('/battery', distance.getRouter());

//
// Endpoint /about
//
app.get('/about', about.getHandler());

module.exports = function (port, host) {
  host = host || 'localhost';
  return app.listen(port, host, function () {
    logger.config('Bicycle Distance Report Server is listen on "http://', host, ':', port);
  });
};
