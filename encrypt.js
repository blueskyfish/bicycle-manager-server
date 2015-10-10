/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var content = require('./app/content');

var params = process.argv.slice(2);

header_();

if (params.length === 0) {
  usage_();
} else {
  encrypt(params[0], params[1]);
}

function header_() {
  console.info('Bicycle Encrypt');
}

function usage_() {
  console.info('Usage:');
  console.info('  $ node encrypt.js value password');
  process.exit(0);
}

function encrypt(value, password) {
  var text = content.encrypt(value, password);
  console.info('  %s => %s', value, text);
}


