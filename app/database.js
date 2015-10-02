/**
 * bicycle-distance-report-server - https//github.com/blueskyfish/bicycle-distance-report-server
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var Q = require('q');

var settings = require('./settings');
var logger = require('./logger').getLogger('server.database');

var mConfig = {
  host: settings.getValue('db.host', 'localhost'),
  port: settings.getValue('db.port', 3306),
  user: settings.getValue('db.user', null),
  password: settings.getValueDecrypt('db.password'),
  database: settings.getValue('db.database')
};

if (logger.isDebugEnabled()) {
  logger.debug('DB:\n', JSON.stringify(mConfig, null, 3));
}


module.exports = {

  getConnection: function () {
    return getConnection_();
  },

  query: function (sql, values, conn) {
    return query_(sql, values, conn);
  }
};

function getConnection_() {
  var conn = mysql.createConnection(mConfig);

  conn.config.queryFormat = function (sql, values) {
    if (!values) {
      return sql;
    }
    if (logger.isDebugEnabled()) {
      logger.debug('prepare: "', sql.replace('\n', ' '));
    }
    sql = sql.replace(/\{(\w+)}/g, function (text, key) {
      if (values.hasOwnProperty(key)) {
        text = conn.escape(values[key]);
      }
      if (logger.isDebugEnabled()) {
        logger.debug(' ', key, ' => ', text);
      }
      return text;
    });
    if (logger.isDebugEnabled()) {
      logger.debug('sql: ', sql.replace('\n', ' '));
    }
    return sql;
  };

  return conn;
}

function query_(sql, values, conn) {
  var done = Q.defer();

  conn.query(sql, values, function (err, result) {
    if (err) {
      return done.reject(_createError(err));
    }
    done.resolve(result);
  });

  return done.promise;
}

function _createError(err) {
  return {
    code: err.code,
    no: err.errno,
    sqlState: err.sqlState,
    stack: err.stack
  };
}
