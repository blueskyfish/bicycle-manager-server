/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * Contains the information about the application. It is read from the package.json
 *
 * @module bisev/info
 */

'use strict';

const pkg = require('../package.json');


module.exports.getAppName = function () {
  return pkg.name;
};

module.exports.getAppTitle = function () {
  return pkg.title;
};

module.exports.getAppVersion = function () {
  return pkg.version;
};

module.exports.getAppVendor = function () {
  return pkg.author;
};

module.exports.getAppDescription = function () {
  return pkg.description;
};

/**
 * Prints the header information.
 *
 * @param {Logger} [logger] the logger for additional print out the header.
 */
module.exports.headerPrint = function (logger) {
  if (logger) {
    logger.info('"', pkg.title, '" (', pkg.version, ')');
    logger.info('');
    if (logger.isConsole) {
      return;
    }
  }
  console.info('%s (%s)', pkg.title, pkg.version);
  console.info('  %s', pkg.author);
  console.info('');
};
