'use strict'
require('dotenv').load();

const express = require('express');
const knex = require('../../knex');

const resource = express.Router(); //express.Router({mergeParams: true});

resource.get('/', function(req, res, next) {
    //console.log("resources get", req.shiftid)
    if(req.shiftid === undefined) {
        knex.from('resources')
        .then(function(data) {
            res.send(data)
        })
    } 
    else {
        knex.from('shifts_resources')
        .where('shift', req.shiftid)
        .join('resources', {'resource': 'resources.id'})
        .then(function(data) {
            res.send(data)
        })
    }
  }
);

resource.get('/:resourceid', function(req, res, next) {
    //console.log(req.shiftid)
    if(req.shiftid === undefined) {
        //console.log("111")
        knex.from('resources')
        .where('resources.id', req.params.resourceid)
        .then(function(data) {
            res.send(data)
        })
    } else {
        res.status(401).json({
            status: "error",
            error_type: "resourceserr",
            message: "too deep route"
        })
    }
});

resource.post('/', function(req, res, next) {
    knex('resources')
    .insert(req.body.data)
    .then(function () {
        res.json({status: "ok"})
    }).catch(function(e) {
        res.status(401).json({
            status: "error",
            error_type: "resourceserr",
            message: "general"
        })
    })
});

module.exports = resource;
