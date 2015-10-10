/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var fs = require('fs');

var _ = require('lodash');
var strftime = require('strftime');

var settings = require('./settings');


module.exports = {
  /**
   * Append the logger message.
   *
   * @param {string} logName the log name
   * @param message the whole message
   */
  appendMessage: function (logName, message) {
    _appendMessage(logName, message);
  }
};


function _appendMessage(logName, message) {
  var now = new Date();
  var time = strftime('%H:%M:%S', now);
  var date = strftime('%Y-%m-%d', now);
  var content = [
    '[', time, '] ',
    _.padLeft(logName, 15, ' '),
    message
  ].join('');
  var filename = "{date}-bicycle-manager-server-{mode}".replace(/\{(\.+)}/g, function (text, key) {
    switch (key) {
      case 'date':
        return date;
      case 'mode':
        return settings.mode();
      default:
        return text;
    }
  });
  fs.appendFile(filename, content, 'utf8', function (err) {
    if (err) {
      // FIXME Error is occurred by appending the logger message
    }
  });
}