/**
 * bicycle-distance-report-server - https//github.com/blueskyfish/bicycle-distance-report-server
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var crypto = require('crypto');

var environment = require('./environment');

module.exports = {

  encrypt: function (value, password) {
    return encrypt_(value, password);
  },

  decrypt: function (value, password) {
    return decrypt_(value, password);
  }
};


var ALGORITHM = 'aes-256-ctr';
var TEXT_ENCODE = 'utf8';
var CRYPT_ENCODE = 'hex';

var SALT = environment.fromEnv('BICYCLE_SALT');

function encrypt_(value, password) {
  var cipher = crypto.createCipher(ALGORITHM, _getPassword(password));
  return cipher.update(value, TEXT_ENCODE, CRYPT_ENCODE) + cipher.final(CRYPT_ENCODE);
}

function decrypt_(value, password) {
  var decipher = crypto.createDecipher(ALGORITHM, _getPassword(password));
  return decipher.update(value, CRYPT_ENCODE, TEXT_ENCODE) + decipher.final(TEXT_ENCODE);
}

function _getPassword(password) {
  if (password || SALT) {
    return password || SALT;
  }
  throw new Error('Missing the password!');
}
