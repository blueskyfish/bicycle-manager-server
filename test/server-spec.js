/**
 * bicycle-distance-report-server - https//github.com/blueskyfish/bicycle-distance-report-server
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

describe('Bicycle Distance Report Server', function () {
  var app;
  var token = 'bdrs-test-' + Date.now();
  var isNumber = /\d+/;

  before(function () {
    app = require('../app/application')(3000);
  });

  it('Should insert a new distance data', function (done) {
    var data = {
      date: '2015-10-01',
      distance: 2200.1,
      averageSpeed: 15.4,
      rangeDistance: 12
    };

    request(app)
      .post('/distances')
      .send(data)
      .set('x-bicycle-token', token)
      .expect(200)
      .expect(function (res) {
        var result = res.body;
        assert(!!result, 'response body should not null');
        assert(!!result.status, 'result object should have the property "status"');
        assert.equal(result.status, 'okay', 'result status should be "okay"');
        assert(!!result.distanceId, 'result object should have the property "distanceId"');
        assert(isNumber.test(result.distanceId), 'result distanceId should be a number');
      })
      .end(done);
  });

  it('Should show the distance list', function (done) {
    request(app)
      .get('/distances')
      .set('x-bicycle-token', token)
      .expect(function (res) {
        console.log(res.body);
      }).end(done)
  });
});

