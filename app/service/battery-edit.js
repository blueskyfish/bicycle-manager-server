/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * @module bicycle/service/battery-edit
 *
 * @requires util
 * @requires lodash
 * @requires q
 *
 * @requires module:bicycle/db
 */

'use strict';

const util        = require('util');

const _           = require('lodash');
const Q           = require('q');

const db          = require('app/db');

/**
 * @name BatteryEditOptions
 * @property {String} token the authentication token
 * @property {Number} id the id of the battery record.
 */

/**
 * @name BatteryEdit
 * @property {Number} id the id of the battery record
 * @property {String} date the date of the battery recharge
 * @property {Number} mileage the mileage from the control
 * @property {Number} averageSpeed the average speed
 */


/**
 * The sql statement returns the battery record for editing.
 *
 * @type {string}
 */
const SQL_SELECT_BATTERY_EDIT = [
  'SELECT `id`, ',
  '  DATE_FORMAT(`date`, "%Y-%m-%d") AS date,',
  '  `mileage`,',
  '  `average_speed` AS averageSpeed,' +
  '  `leftover` ',
  'FROM `bicycle-battery` ',
  'WHERE `id` = {id} AND `token` = {token} '
].join('\n');


/**
 * Returns the battery record from the given token and id.
 *
 * @param {BatteryEditOptions} options the options
 * @return {promise} the promise resolve callback has a parameter from {@type BatteryEdit}
 */
module.exports.execute = function (options) {
  return db.getConnection()
    .then(function (conn) {
      const values = {
        token: options.token,
        id: options.id
      };
      return conn.query(SQL_SELECT_BATTERY_EDIT, values)
        .then(function (result) {
          if (_.isArray(result)) {
            result = result[0];
          }
          if (!result) {
            return Q.reject(util.format('battery [%s] is not found', options.id));
          }
          return result;
        })
        .finally(function () {
          conn.release();
        });
    });
};
