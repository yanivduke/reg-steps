'use strict'
require('dotenv').load();

const express = require('express');
const knex = require('../../knex');

const shift = express.Router();

shift.get('/', function(req, res, next) {
    //console.log("shift get", req.resourceid)
    if(req.resourceid === undefined) {
        knex.select()
        .from('shifts')
        .then(function(data) {
            res.send(data);
        })
    } else {
        knex.from('shifts_resources')
        .where('resource', req.resourceid)
        .join('shifts', {'shift': 'shifts.id'})
        .then(function(data) {
            res.send(data)
        })
    }
  }
);

shift.get('/:shiftid', function(req, res, next) {
    knex.from('shifts')
    .where('shifts.id', req.params.shiftid)
    .then(function(data) {
        res.send(data)
    })
})

shift.post('/', function(req, res, next) {
    //console.log("body req post: ", req.body);
    //console.log("data req post: ", req.body.data);
    knex('shifts')
    .insert(req.body.data)
    .then(function () {
        res.json({status: "ok"})
    }).catch(function(e) {
        res.status(401).json({
            status: "error",
            error_type: "shifterr",
            message: "general"
        })
    })
})


module.exports = shift;
