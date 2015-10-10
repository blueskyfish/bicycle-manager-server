/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var helper = require('./helper');

var pkg = require('../../package.json');

module.exports = {
  getHandler: function () {
    return function aboutHandler(req, res) {
      _aboutHandler(req, res);
    }
  }
};

function _aboutHandler(req, res) {
  helper.sendResult(res, {
    version: {
      name: pkg.name,
      version: pkg.version
    },
    author: {
      name: pkg.author.name,
      url: pkg.author.url,
      email: pkg.author.email
    }
  });
}