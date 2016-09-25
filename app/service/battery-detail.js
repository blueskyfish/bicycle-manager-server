/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * @module bicycle/service/battery-detail
 *
 * @requires util
 * @requires lodash
 * @requires q
 *
 * @requires module:bicycle/args
 * @requires module:bicycle/db
 */

'use strict';

const util        = require('util');

const _           = require('lodash');
const Q           = require('q');

const db          = require('app/db');

/**
 * @name BatteryDetailOptions
 * @property {String} token the authentication token
 * @property {Number} id the id of the battery record.
 */

/**
 * @name BatteryDetail
 * @property {Number} id the id of the battery record
 * @property {String} date the date of the battery recharge
 * @property {Number} mileage the mileage from the control
 * @property {Number} averageSpeed the average speed
 * @property {Number} distance the distance
 */

/**
 * The sql statement select the battery details from the given token and id.
 *
 * @type {string}
 */
const SQL_SELECT_BATTERY_DETAIL = [
  'SELECT bb.id, DATE_FORMAT(bb.date, "%Y-%m-%d") AS date, ',
  '  bb.mileage, bb.average_speed AS averageSpeed, ',
  '  bb.mileage - ba.mileage AS distance, bb.leftover ',
  'FROM `bicycle-battery` AS bb, ',
  ' (SELECT MAX(mileage) AS mileage ',
  '  FROM `bicycle-battery` ',
  '  WHERE mileage < ( ',
  '    SELECT mileage ',
  '    FROM `bicycle-battery` ',
  '    WHERE `id` = {id} AND `token` = {token}) ',
  '  ) as ba ',
  'WHERE bb.id = {id} AND bb.token = {token}'
].join('\n');


/**
 * Returns the battery details.
 *
 * @param {BatteryDetailOptions} options
 * @return {promise} the promise resolve callback has a parameter from {@type BatteryDetail}.
 */
module.exports.execute = function (options) {
  return db.getConnection()
    .then(function (conn) {
      var values = {
        token: options.token,
        id: options.id
      };
      return conn.query(SQL_SELECT_BATTERY_DETAIL, values)
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
