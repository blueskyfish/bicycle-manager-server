/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

'use strict';

/**
 * @module bisev/logger
 *
 * @requires fs
 * @requires path
 * @requires module:bluesky-logger
 * @requires module:bluesky-logger/file-appender
 * @requires module:bisev/info
 * @requires module:bisev/config-util
 */

const fs   = require('fs');
const path = require('path');

const loggerFactory = require('bluesky-logger');
const fileAppender  = require('bluesky-logger/file-appender');

const info          = require('app/info');
const configUtil    = require('app/config-util');

const DEFAULT_LOGGER_CONFIG = {
  'root': 'info',
  'bisev': 'debug'
};

// write the log messages to the console or not.
var consoleOutput = true;

/**
 * start - Initialize the logger.
 *
 * @param {object} settings the settings object
 * @return {Logger} the logger for namespace **temo**.
 */
module.exports.start = function (settings) {
  // Logger Configuration
  loggerFactory
    .config(configUtil.getSetting(settings, 'logger.config', DEFAULT_LOGGER_CONFIG))
    .setSeparator(configUtil.getSetting(settings, 'logger.separator', '.'));
  if (configUtil.getSetting(settings, 'logger.appender', 'console') === 'file') {

    const logPath = path.join(configUtil.getSetting(settings, 'homePath', '.'), 'logs');
    if (!fs.existsSync(logPath)) {
      // create the log folder / directory.
      fs.mkdirSync(logPath);
    }
    const filer = fileAppender({
      path: logPath,
      name: info.getAppName()
    });
    loggerFactory.setWriter(filer.appendMessage);
    // the log messages are written into file
    consoleOutput = false;
  }
  const logger = loggerFactory.getLogger('bisev');
  logger.isConsole = consoleOutput;
  return logger;
};

/**
 * getLogger - Returns the logger with the given namespace
 *
 * @param {string} name the namespace
 * @return {Logger}
 */
module.exports.getLogger = function (name) {
  const logger = loggerFactory.getLogger(name);
  logger.isConsole = consoleOutput;
  return logger;
};
