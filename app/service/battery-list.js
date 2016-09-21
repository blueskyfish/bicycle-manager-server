/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * @module bisev/service/battery-list
 *
 * @requires lodash
 * @requires module:bisev/db
 */

'use strict';

const _   = require('lodash');

const db  = require('app/db');

/**
 * @name BatteryListOptions
 * @property {String} token the authentication token
 */

/**
 * The sql statement select the whole battery records for the given token.
 *
 * @type {string}
 */
const SQL_SELECT_BATTERY_LIST = [
  'SELECT `id`, ',
  '  DATE_FORMAT(`date`, "%Y-%m-%d") AS date, ',
  '  `mileage`, ',
  '  `average_speed` AS averageSpeed,' +
  '  `leftover` ',
  'FROM `bicycle-battery` ',
  'WHERE `token` = {token} ',
  'ORDER BY `date` DESC '
].join('\n');

/**
 * Returns the whole list of battery records from the given token.
 *
 * @param {BatteryListOptions} options the options for the request.
 * @return {promise} the promise resolve callback has a parameter with {@type Array<BatteryDetail>}.
 */
module.exports.execute = function (options) {
  return db.getConnection()
    .then(function (conn) {
      var values = {
        token: options.token
      };
      return conn.query(SQL_SELECT_BATTERY_LIST, values)
        .then(function (batteryList) {
          return _prepareBatteryList(batteryList);
        })
        .finally(function () {
          conn.release();
        });
    })
};

function _prepareBatteryList(batterList) {
  var items = [];
  var prevItem;
  _.forEach(batterList, function (batteryItem) {
    if (!prevItem) {
      prevItem = batteryItem;
      return;
    }
    prevItem.distance = prevItem.mileage - batteryItem.mileage;
    items.push(prevItem);
    prevItem = batteryItem;
  });
  return items;
}
