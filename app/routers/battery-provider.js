/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var _ = require('lodash');
var Q = require('q');

var database = require('../database');


module.exports = {

  /**
   * Returns the list of battery entries.
   *
   * Success Result:
   * ```
   * [
   *   {
   *     "id": "{number},
   *     "date": "{string: yyyy-mm-dd}"
   *     "averageSpeed: "{number}",
   *     "mileage": "{number}",
   *     "leftover": "{number}",
   *     "distance": "{number}
   *   },
   *   ...
   * ]
   * ```
   * @param {string} token the token of the current user.
   * @return {Q.promise}
   */
  getBatteryList: function (token) {
    return getBatteryList_(token);
  },

  /**
   * Returns the battery details from the given id, token.
   *
   * Success Result:
   * ```
   * {
   *   "id": "{number},
   *   "date": "{string: yyyy-mm-dd}"
   *   "averageSpeed: "{number}",
   *   "mileage": "{number}",
   *   "leftover": "{number}",
   *   "distance": "{number}
   * }
   * ```
   *
   * @param {string} token the token of the current user.
   * @param {number} id the id of the battery item
   * @return {Q.promise}
   */
  getBatteryDetail: function (token, id) {
    return getBatteryDetail_(token, id);
  },

  /**
   * Returns the battery item for editing
   *
   * Success Result:
   * ```
   * {
   *   "id": "{number},
   *   "date": "{string: yyyy-mm-dd}"
   *   "averageSpeed: "{number}",
   *   "mileage": "{number}",
   *   "leftover": "{number}"
   * }
   * ```
   *
   * @param {string} token the token of the current user
   * @param {number} id the id of the battery item
   * @return {Q.promise}
   */
  getBatteryEdit: function (token, id) {
    return getBatteryEdit_(token, id);
  },

  /**
   * Insert a battery item to the database.
   *
   * Item
   * ```
   * {
   *   "date": "{string: yyyy-mm-dd}",
   *   "averageSpeed: "{number}",
   *   "mileage": "{number}",
   *   "leftover": "{number}
   * }
   * ```
   *
   * Success Result:
   * ```
   * {
   *   "id": "{number}"
   * }
   * ```
   *
   * @param {string} token the token of the current user.
   * @param {object} item the record.
   * @return {Q.promise}
   */
  insertBatteryItem: function (token, item) {
    return insertBatteryItem_(token, item);
  },

  /**
   * Updates a given battery item with new values.
   *
   * Item
   * ```
   * {
   *   "date": "{string: yyyy-mm-dd}",
   *   "averageSpeed: "{number}",
   *   "mileage": "{number}",
   *   "leftover": "{number}
   * }
   * ```
   *
   * Success Result:
   * ```
   * {
   *   "id": "{number}"
   * }
   * ```
   *
   * @param {string} token the token of the current user.
   * @param {number} id the id of the given battery item
   * @param {object} item the record.
   * @return {Q.promise}
   */
  updateBatteryItem: function (token, id, item) {
    return updateBatteryItem_(token, id, item);
  },

  /**
   * Deletes the given battery item.
   *
   * Success Result:
   * ```
   * {
   *   "id": "{number}"
   * }
   * ```
   *
   * @param {string} token the token of the current user.
   * @param {number} id the id of the battery item
   * @return {Q.promise}
   */
  deleteBatteryItem: function (token, id) {
    return deleteBatteryItem_(token, id);
  }
};

var SQL_SELECT_LIST = [
  'SELECT `id`, ',
  '  DATE_FORMAT(`date`, "%Y-%m-%d") AS date, ',
  '  `mileage`, ',
  '  `average_speed` AS averageSpeed,' +
  '  `leftover` ',
  'FROM `bicycle-battery` ',
  'WHERE `token` = {token} ',
  'ORDER BY `date` DESC '
].join('\n');

var SQL_SELECT_DETAIL = [
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

var SQL_SELECT_EDIT = [
  'SELECT `id`, ',
  '  DATE_FORMAT(`date`, "%Y-%m-%d") AS date, ',
  '  `mileage`, ',
  '  `average_speed` AS averageSpeed,' +
  '  `leftover` ',
  'FROM `bicycle-battery` ',
  'WHERE `id` = {id} AND `token` = {token} '
].join('\n');


var SQL_INSERT_BATTERY = [
  'INSERT INTO `bicycle-battery` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `mileage` = {mileage}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `leftover` = {leftover}'
].join('\n');

var SQL_UPDATE_BATTERY = [
  'UPDATE `bicycle-battery` SET ',
  '  `token` = {token}, ',
  '  `date` = {date}, ',
  '  `mileage` = {mileage}, ',
  '  `average_speed` = {averageSpeed}, ' +
  '  `leftover` = {leftover} ',
  'WHERE `id` = {id} AND `token` = {token}'
].join('\n');

var SQL_DELETE_BATTERY = [
  'DELETE FROM `bicycle-battery` ',
  'WHERE `id` = {id} AND `token` = {token}'
].join('\n');



function getBatteryList_(token) {
  var conn = database.getConnection();
  var values = {
    token: token
  };

  return database.query(SQL_SELECT_LIST, values, conn)
    .then(function (result) {
      return _prepareBatteryList(result);
    })
    .fin(function () {
      conn.end();
    });
}

function getBatteryDetail_(token, id) {
  var conn = database.getConnection();
  var values = {
    id: id,
    token: token
  };

  return database.query(SQL_SELECT_DETAIL, values, conn)
    .then(function (result) {
      if (isArray(result)) {
        result = result[0];
      }
      return result || null;
    })
    .fin(function () {
      conn.end();
    });
}

function getBatteryEdit_(token, id) {
  var conn = database.getConnection();
  var values = {
    id: id,
    token: token
  };

  return database.query(SQL_SELECT_EDIT, values, conn)
    .then(function (result) {
      if (_.isArray(result)) {
        result = result[0];
      }
      console.log('Edit %s: %s', id, JSON.stringify(result));
      return result || null;
    })
    .fin(function () {
      conn.end();
    });
}

function insertBatteryItem_(token, item) {
  var conn = database.getConnection();
  var values = {
    token: token
  };
  var data = _.assign({}, values, item);

  return database.query(SQL_INSERT_BATTERY, data, conn)
    .then(function (result) {
      return result.insertId || -1
    })
    .fin(function () {
      conn.end();
    });
}

function updateBatteryItem_(token, id, item) {
  var conn = database.getConnection();
  var values = {
    id: id,
    token: token
  };
  var data = _.assign({}, values, item);

  return database.query(SQL_UPDATE_BATTERY, data, conn)
    .then(function (result) {
      return id;
    })
    .fin(function () {
      conn.end();
    });

}

function deleteBatteryItem_(token, id) {
  var conn = database.getConnection();
  var values = {
    id: id,
    token: token
  };

  return database.query(SQL_DELETE_BATTERY, values, conn)
    .then(function (result) {
      return id;
    })
    .fin(function () {
      conn.end();
    });
}


function _prepareBatteryList(batterList) {
  var items = [];
  var prevItem;
  forEach(batterList, function (batteryItem) {
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