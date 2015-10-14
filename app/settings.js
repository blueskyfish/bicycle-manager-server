/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var path = require('path');

var _ = require('lodash');
var merge = require('merge');
var minimist = require('minimist');

var environment = require('./environment');
var content = require('./content');

var params = minimist(process.argv.slice(2));

var mMode = params.mode || environment.fromEnv('BICYCLE_MODE') || 'local';
var mHost = params.host || 'localhost';
var mPort = params.port || 8800;
var mTrace = params.trace || false;

var mSettings = loadSettings_();

module.exports = {

  mode: function () {
    return mMode;
  },

  host: function () {
    return mHost;
  },

  port: function () {
    return mPort;
  },

  isTrace: function () {
    return !!mTrace;
  },

  getValue: function (name, def) {
    return getValue_(name, def)
  },

  getValueDecrypt: function (name) {
    var value = getValue_(name, null);
    return value ? content.decrypt(value) : null;
  }
};

function getValue_(name, def) {
  return _.get(mSettings, name, def);
}

function loadSettings_() {
  var globalSettings = _loadGlobalSettings();
  var modeSettings = _loadModeSettings();
  var settings = merge.recursive({}, globalSettings, modeSettings);
  if (mMode === 'local' || mMode === 'test') {
    console.info('Settings:\n%s', JSON.stringify(settings, null, 3));
  }
  return settings;
}

function _loadGlobalSettings() {
  var filename = path.join(environment.getHomePath(true), 'var', 'config', 'settings.json');
  try {
    return require(filename);
  } catch (e) {
    throw new Error('Settings "' + filename + '" not exist or not valid!', 3347);
  }
}

function _loadModeSettings() {
  var filename = path.join(environment.getHomePath(true), 'var', 'config', 'settings.' + mMode + '.json');
  try {
    return require(filename);
  } catch (e) {
    return {};
  }
}