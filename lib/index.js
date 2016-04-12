#!/usr/bin/env node

'use strict';

var path = require('path');
var expect = require('chai').expect;
var isPlainObj = require('is-plain-obj');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke! Check your terminal.');
});

app.use('/', express.static('public'));
app.use('/bower_components',  express.static('bower_components'));

app.get('/api/load', function (req, res) {
  res.sendFile(path.resolve('lib', 'items.json'));
});

app.post('/api/save', function (req, res) {
  var items = req.body.items;

  expect(items).to.not.equal(void 0, 'The payload should have an `items` member');
  expect(Array.isArray(items)).to.equal(true, 'The `items` member should be an array');
  expect(items).to.have.length.above(0, 'The `items` member should not be empty');

  items.forEach(function (item) {
    expect(isPlainObj(item)).to.equal(true, 'An item in the array should be an object');
    expect(item.name).to.be.a('string', 'An item should have a string `name` member');
    expect(item.name).to.have.length.above(0, 'An item should not have an empty `name` member');
    expect(item.checked).to.be.a('boolean', 'An item should have a boolean `checked` member');
  });

  res.status(200).send(req.body);
});

app.listen(1984, function () {
  console.log('Server running at: http://localhost:1984/');
});
