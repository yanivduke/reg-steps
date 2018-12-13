'use strict'
require('dotenv').load();

const express = require('express');
const knex = require('../../knex');

const property = express.Router(); //express.Router({mergeParams: true});

property.get('/', function(req, res, next) {
    //console.log("property get", req.shiftid)
    if(req.resourceid === undefined) {
        knex.from('properties')
        .then(function(data) {
            res.send(data)
        })
    } 
    else {
        knex.from('resources_properties')
        .where('resource', req.resourceid)
        .join('properties', {'property': 'properties.key'})
        .then(function(data) {
            res.send(data)
        })
    }
  }
);

property.get('/:propertyid', function(req, res, next) {
    knex.from('properties')
    .where('properties.key', req.params.propertyid)
    .then(function(data) {
        res.send(data)
    })
});

property.post('/', function(req, res, next) {
    knex('properties')
    .insert(req.body.data)
    .then(function () {
        res.json({status: "ok"})
    }).catch(function(e) {
        res.status(401).json({
            status: "error",
            error_type: "propertieserr",
            message: "general"
        })
    })
});

property.put('/', function(req, res, next) {
    knex('resources_properties')
    .insert(req.body.data)
    .then(function () {
        res.json({status: "ok"})
    }).catch(function(e) {
        res.status(401).json({
            status: "error",
            error_type: "propertieserr",
            message: "general"
        })
    })
});

module.exports = property;
