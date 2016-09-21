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
 * @name BatteryDeleteOptions
 * @property {String} token the authentication token
 * @property {Number} id the id of the battery record.
 */

/**
 * The sql statement delete the battery rrecord
 *
 * @type {string}
 */
const SQL_DELETE_BATTERY = [
  'DELETE FROM `bicycle-battery` ',
  'WHERE `id` = {id} AND `token` = {token}'
].join('\n');


/**
 * Delete the battery record by the given id and token.
 *
 * @param {BatteryDeleteOptions} options
 * @return {promise} the promise resolve callback has a parameter with the deleted id of the record.
 */
module.exports.execute = function (options) {
  return db.getConnection()
    .then(function (conn) {
      const id = options.id;
      const values = {
        token: options.token,
        id: options.id
      };
      return conn.query(SQL_DELETE_BATTERY, values)
        .then(function (result) {
          if (result.affectedRows !== 1) {
            return Q.reject(util.format('Could not delete battery record'));
          }
          return id;
        });
    });
};
