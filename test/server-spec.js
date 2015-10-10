/**
 * bicycle-manager-server - https//github.com/blueskyfish/bicycle-manager-server.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var assert = require("assert");

var request = require('supertest');

before(function () {
  console.log('>>>> setup environment...');
  process.env.BICYCLE_SALT = 'testtest';
  process.env.BICYCLE_MODE = 'test';
});

describe('Bicycle Manager Server', function () {
  var app;
  var token = 'bdrs-test-' + Date.now();
  var isNumber = /\d+/;

  before(function () {
    app = require('../app/application')(3000);
  });

  it('Should insert a new battery data', function (done) {
    var data = {
      date: '2015-10-01',
      mileage: 22000,
      averageSpeed: 154,
      distance: 120
    };

    request(app)
      .post('/battery')
      .send(data)
      .set('x-bicycle-token', token)
      .expect(200)
      .expect(function (res) {
        var result = res.body;
        assert(!!result, 'response body should not null');
        assert(!!result.status, 'result object should have the property "status"');
        assert.equal(result.status, 'okay', 'result status should be "okay"');
        assert(!!result.id, 'result object should have the property "id"');
        assert(isNumber.test(result.id), 'result id should be a number');
      })
      .end(done);
  });

  it('Should show the battery list', function (done) {
    request(app)
      .get('/battery')
      .set('x-bicycle-token', token)
      .expect(function (res) {
        console.log(res.body);
      }).end(done)
  });
});

