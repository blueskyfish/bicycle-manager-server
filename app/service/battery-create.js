/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * @module bisev/service/battery-create
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
 * @name BatteryCreateOptions
 * @property {String} token the authentication token
 * @property {String} date the date of the battery recharge
 * @property {Number} leftover the left over
 * @property {Number} mileage the mileage from the control
 * @property {Number} averageSpeed the average speed
 */

/**
 * The sql statement insert a new battery record.
 *
 * @type {string}
 */
const SQL_INSERT_BATTERY = [
  'INSERT INTO `bicycle-battery` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `mileage` = {mileage}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `leftover` = {leftover}'
].join('\n');


/**
 * Insert a new battery record
 *
 * @param {BatteryCreateOptions} options
 * @return {promise} the promise resolve callback has a parameter with the new id of the record.
 */
module.exports.execute = function (options) {
  return db.getConnection()
    .then(function (conn) {
      const values = _.merge({}, options);
      return conn.query(SQL_INSERT_BATTERY, values)
        .then(function (result) {
          if (!result.insertId) {
            return Q.reject('Could not create the battery record');
          }
          return result.insertId;
        })
        .finally(function () {
          conn.release();
        });
    });
};
