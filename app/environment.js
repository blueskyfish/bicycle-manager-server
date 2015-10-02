/**
 * bicycle-distance-report-server - https//github.com/blueskyfish/bicycle-distance-report-server
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

module.exports = {

  /**
   * Returns the bicycle home folder name
   *
   * @param {boolean} [fallbackCwd] if true, then it use the process.cwd()
   *    when missing the environment name
   * @returns {string}
   */
  getHomePath: function (fallbackCwd) {
    return getHomePath_(fallbackCwd);
  },

  /**
   * Returns the environment value
   *
   * @param {string} name
   * @returns {null|string}
   */
  fromEnv: function (name) {
    return fromEnv_(name);
  }
};

function getHomePath_(fallbackCwd) {
  return fromEnv_('BICYCLE_HOME') || (fallbackCwd === true ? process.cwd() : '.');
}

function fromEnv_(name) {
  var upName = name.toUpperCase();
  var loName = name.toLowerCase();
  return process.env[upName] ||
    process.env[loName] ||
    null;
}
