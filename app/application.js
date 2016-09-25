/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * The application of express.
 *
 * @module bicycle/application
 *
 * @requires body-parser
 * @requires express
 * @requires q
 * @requires module:bicycle/info
 * @requires module:bicycle/config-util
 * @requires module:bicycle/logger
 * @requires module:bicycle/middleware
 * @requires module:bicycle/router/battery
 */

'use strict';

const bodyParser      = require('body-parser');
const express         = require('express');
const Q               = require('q');

const info            = require('app/info');
const configUtil      = require('app/config-util');
const logger          = require('app/logger').getLogger('bicycle');

const middleware      = require('app/middleware');

const routerBattery   = require('app/router/battery');

const app = express();

const DEFAULT_PORT    = 40080;
const DEFAULT_HOST    = 'localhost';

/**
 * starts the application.
 *
 * @param {object} settings
 * @return {promise} the promise resolve callback is returns after the application is listening.
 */
module.exports.start = function (settings) {

  // add the config instance under "config".
  app.set('settings', settings);
  // set the application title
  app.set('title', info.getAppTitle());

  // Middlewares...

  app.use(middleware.measureTime());

  app.use(bodyParser.json());

  // Routers...

  //
  // Router: /battery
  //
  app.use('/battery', routerBattery);


  // Endpoints...

  /**
   * @api {get} /about About
   * @apiName GetAbout
   * @apiGroup System
   * @apiDescription Shows the information about the application
   * @apiVersion 2.0.0
   * @apiExample {curl} Example usage:
   *     curl -i http://localhost:18080/about
   *
   * @apiSuccess {String} name the application name
   * @apiSuccess {String} title the title of the application
   * @apiSuccess {String} version the version of the application
   * @apiSuccess {String} vendor the author / company of the application
   * @apiSuccess {String} description a short description.
   *
   * @apiSuccessExample {json} Success response:
   *     HTTP/1.1 200 OK
   *     {
   *       "name": "bicycle-server",
   *       "title": "Bicycle Server",
   *       "version": "2.0.0",
   *       "vendor": "blueskyfish <blueskyfish@kirchnerei.de>",
   *       "description": "The bicycle backend..."
   *     }
   */
  app.get('/about', function about(req, res) {
    res.send({
      name: info.getAppName(),
      title: info.getAppTitle(),
      version: info.getAppVersion(),
      vendor: info.getAppVendor(),
      description: info.getAppDescription()
    });
  });

  // Starting...

  // get the port and host
  const port = configUtil.getSetting(settings, 'server.port', DEFAULT_PORT);
  const host = configUtil.getSetting(settings, 'server.host', DEFAULT_HOST);

  const done = Q.defer();

  // starts the listening of the express application...
  app.listen(port, host, function () {
    logger.info('Server is listen http://', host, ':', port);
    done.resolve(true);
  });

  return done.promise;
};
