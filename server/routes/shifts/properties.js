'use strict'
require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const knex = require('../../knex');
const router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res) {
  knex.select()
      .from('properties')
      .then(function(data) {
        res.send(data);
      })
  }
);

router.get('/:id', function(req, res) {
  knex.from('properties')
      .where('properties.id', req.params.id)
      .then(function(data) {
        res.send(data)
      })
})

router.post('/', async function(req, res) {
    //console.log("regtoken req: ", req.body.regtoken);
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
})

module.exports = router;
