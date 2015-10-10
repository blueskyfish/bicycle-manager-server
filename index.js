/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var application = require('./app/application');
var bootstrap = require('./app/bootstrap');
var environment = require('./app/environment');
var logger = require('./app/logger').getLogger('main');
var settings = require('./app/settings');

var port = settings.port();
var host = settings.host();

var options = {
  homePath: environment.getHomePath(true),
  name: 'bdr-server',
  duration: 600,
  shutdown: function (name) {
    logger.info('"', name, '": Server will be shutdown');
  }
};

bootstrap(options).then(
  function () {
    var app = application(port, host);
  },
  function (reason) {
    throw new Error(reason);
  }
);
