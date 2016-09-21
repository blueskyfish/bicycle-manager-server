/*
 * Bicycle Server - https://github.com/blueskyfish/bicycle-server.git
 *
 * Copyright (c) 2016 blueskyfish
 */

/**
 * @module bisev/router/battery
 *
 * @requires express
 * @requires bisev/executor
 */

'use strict';

const _             = require('lodash');
const express       = require('express');
const Q             = require('q');

const executor      = require('app/executor');
const middleware    = require('app/middleware');

const batteryList   = require('app/service/battery-list');
const batteryEdit   = require('app/service/battery-edit');
const batteryDetail = require('app/service/battery-detail');
const batteryCreate = require('app/service/battery-create');
const batteryUpdate = require('app/service/battery-update');
const batteryDelete = require('app/service/battery-delete');

/**
 * @type {Router}
 */
const router = express.Router({
  caseSensitive: true,
  mergeParams: true,
  strict: true
});


//
// Middleware
//

router.use(middleware.headerToken());

// Endpoints

/**
 * @apiDefine BatteryDetailResult
 * @apiSuccess {Number} id the id of the battery detail
 * @apiSuccess {String} date the date of battry charging
 * @apiSuccess {Number} averageSpeed the average speed
 * @apiSuccess {Number} leftover the left over of the battery charge
 * @apiSuccess {Number} distance the total distance
 * @apiSuccess {Number} mileage the mileage from the control
 */

/**
 * @apiDefine BatteryEditResult
 * @apiSuccess {Number} id the id of the battery detail
 * @apiSuccess {String} date the date of battery charging
 * @apiSuccess {Number} averageSpeed the average speed
 * @apiSuccess {Number} leftover the left over of the battery charge
 * @apiSuccess {Number} mileage the mileage from the control
 */

/**
 * @apiDefine BatteryEditBody
 * @apiParam {String} date the date of the battery charge
 * @apiParam {Number} averageSpeed the average speed
 * @apiParam {Number} leftover the left over of the battery charge
 * @apiParam {Number} tmileage the mileage from the control
 */


/**
 * @api {get} /battery Get Battery List
 * @apiName GetBatteryList
 * @apiGroup Battery
 * @apiVersion 2.0.0
 * @apiDescription Return the list of battery details.
 *
 * @apiParam {String} token the authentication token
 *
 * @apiUse BatteryDetailResult
 *
 * @apiSuccessExample {json} Success Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "okay",
 *       "batteryList": [
 *         {
 *           "id": 4711,
 *           "date": "2016-08-12",
 *           "averageSpeed": 188,
 *           "leftover": 50,
 *           "distance": 882,
 *           "mileage": 20143
 *         }
 *       ]
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i -H "x-bicycle-token: 23-341844-3450-x-weAq" http://localhost:18080/battery
 */
router.get('/', function (req, res) {
  executor.execute(req, res, function (sender) {
    /** @type {BatteryListOptions} */
    const options = {
      token: req.token
    };
    sender(batteryList.execute(options), 'batteryList');
  });
});

/**
 * @api {get} /battery/:id Get Battery Edit
 * @apiName GetBatteryEdit
 * @apiGroup Battery
 * @apiVersion 2.0.0
 * @apiDescription Returns the battery record for editing.
 *
 * @apiParam {String} token the authentication token
 * @apiParam {Number} id the id of the battery record
 *
 * @apiUse BatteryEditResult
 *
 * @apiSuccessExample {json} Success Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "okay",
 *       "battery": {
 *         "id": 4711,
 *         "date": "2016-08-12",
 *         "averageSpeed": 188,
 *         "leftover": 50,
 *         "mileage": 23231
 *       }
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i -H "x-bicycle-token: 23-341844-3450-x-weAq" http://localhost:18080/battery/4711
 */
router.get('/:id', function (req, res) {
  executor.execute(req, res, function (sender) {
    /** @type BatteryEditOptions */
    const options = {
      token: req.token,
      id: req.params.id
    };
    sender(batteryEdit.execute(options), 'battery');
  });
});

/**
 * @api {get} /battery/detail/:id Get Battery Detail
 * @apiName GetBatteryDetail
 * @apiGroup Battery
 * @apiDescription Returns the battery details from the given id.
 * @apiVersion 2.0.0
 *
 * @apiParam {String} token the authentication token
 * @apiParam {Number} id the id of the battery record
 *
 * @apiUse BatteryDetailResult
 *
 * @apiSuccessExample Success Response
 *     HTTP1/1.1 200 OK
 *     {
 *       "status": "okay",
 *       "battery": {
 *         "id": 4711,
 *         "date": "2016-08-12",
 *         "averageSpeed": 188,
 *         "leftover": 50,
 *         "distance": 882
 *       }
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i -H "x-bicycle-token: 23-341844-3450-x-weAq" http://localhost:18080/battery/detail/4711
 */
router.get('/detail/:id', function (req, res) {
  executor.execute(req, res, function (sender) {
    /** @type {BatteryDetailOptions} */
    const options = {
      token: req.token,
      id: req.params.id
    };
    sender(batteryDetail.execute(options), 'battery');
  });
});

/**
 * @api {post} /battery Create Battery
 * @apiName CreateBattery
 * @apiGroup Battery
 * @apiDescription Create a new battery record
 * @apiVersion 2.0.0
 *
 * @apiParam {String} token the authentication token
 * @apiUse BatteryEditBody
 *
 * @apiSuccess {Number} id the new id of the battery record
 * @apiSuccessExample {json} Success Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "okay",
 *       "id": 13002
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i -H "x-bicycle-token: 23-341844-3450-x-weAq" \
 *       -H "Content-Type: application/json" \
 *       -X POST -d '{ "date": "2016-08-12", "averageSpeed": 188, "leftover": 50, "mileage": 20013 }' \
 *       http://localhost:18080/battery
 */
router.post('/', function (req, res) {
  executor.execute(req, res, function (sender) {
    const token = {
      token: req.token
    };
    const options = _.merge({}, token, req.body);
    sender(batteryCreate.execute(options), 'id');
  });
});

/**
 * @api {put} /battery/:id Update Battery
 * @apiName UpdateBattery
 * @apiGroup Battery
 * @apiDescription Update a given battery record
 * @apiVersion 2.0.0
 *
 * @apiParam {String} token the authentication token
 * @apiParam {Number} id the id of the battery record
 * @apiUse BatteryEditBody
 *
 * @apiSuccess {Number} id the new id of the battery record
 * @apiSuccessExample {json} Success Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "okay",
 *       "id": 13002
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i -H "x-bicycle-token: 23-341844-3450-x-weAq" \
 *       -H "Content-Type: application/json" \
 *       -X PUT -d '{ "date": "2016-08-12", "averageSpeed": 188, "leftover": 50, "mileage": 20013 }' \
 *       http://localhost:18080/battery/4711
 */
router.put('/:id', function (req, res) {
  executor.execute(req, res, function (sender) {
    const token = {
      token: req.token,
      id: req.params.id
    };
    const options = _.merge({}, token, req.body);
    sender(batteryUpdate.execute(options), 'id');
  });
});

/**
 * @api {delete} /battery/:id Delete Battery
 * @apiName DeleteBattery
 * @apiGroup Battery
 * @apiDescription Delete a given battery record
 * @apiVersion 2.0.0
 *
 * @apiParam {String} token the authentication token
 * @apiParam {Number} id the id of the battery record
 *
 * @apiSuccess {Number} id the new id of the battery record
 * @apiSuccessExample {json} Success Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "okay",
 *       "id": 13002
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i -H "x-bicycle-token: 23-341844-3450-x-weAq" \
 *       -X DELETE
 *       http://localhost:18080/battery/4711
 */
router.delete('/:id', function (req, res) {
  executor.execute(req, res, function (sender) {
    const options = {
      token: req.token,
      id: req.params.id
    };
    sender(batteryDelete.execute(options), 'id');
  });
});


module.exports = router;
