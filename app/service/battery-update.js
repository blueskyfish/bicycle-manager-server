/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * @module bisev/service/battery-update
 *
 * @requires util
 * @requires lodash
 * @requires q
 *
 * @requires module:bisev/db
 */

'use strict';

const util        = require('util');

const _           = require('lodash');
const Q           = require('q');

const db          = require('app/db');

/**
 * @name BatteryUpdateOptions
 * @property {String} token the authentication token
 * @property {Number} id the id of the battery record
 * @property {String} date the date of the battery recharge
 * @property {Number} leftover the left over
 * @property {Number} mileage the mileage from the control
 * @property {Number} averageSpeed the average speed
 */

/**
 * The sql statement update an existing battery record.
 *
 * @type {string}
 */
const SQL_UPDATE_BATTERY = [
  'UPDATE `bicycle-battery` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `mileage` = {mileage}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `leftover` = {leftover} ',
  'WHERE `id` = {id} AND `token` = {token}'
].join('\n');



/**
 * Update an existing battery record.
 *
 * @param {BatteryUpdateOptions} options the options
 * @return {promise} the promise resolve callback has a parameter with the updated id of the record.
 */
module.exports.execute = function (options) {
  return db.getConnection()
    .then(function (conn) {
      const id = options.id;
      const values = _.merge({}, options);
      return conn.query(SQL_UPDATE_BATTERY, values)
        .then(function (result) {
          if (result.affectedRows < 1) {
            return Q.reject('Could not update the battery record');
          }
          return id;
        })
        .finally(function () {
          conn.release();
        });
    });
};
