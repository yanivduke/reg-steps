'use strict'
require('dotenv').load();

var express = require('express');
var router = express.Router();
var authorize = require('./authorize');
var users = require('./users');
var authentication_route = require('./authentication');
var register = require('./register');
var send_mail = require('./sendemail');
var steps = require('./steps');

var shifts = require('./shifts/shifts');
var resources = require('./shifts/resources');
var recipes = require('./shifts/recipes');
var properties = require('./shifts/properties');


var env = process.env.NODE_ENV || 'development';

router.get('/api', function(req, res) {
  res.status(200).send('Hello API!');
});
router.use('/api/sendmail' , send_mail)
router.use('/api/authenticate' , authentication_route)
//router.use('/api/register' , register)
router.use('/api/steps' , steps)

router.use('/api/shifts' , shifts)
router.use('/api/shifts/:shiftid/resources', function(req, res, next) {
  req.shiftid = req.params.shiftid;
  next()
}, resources)
router.use('/api/resources' , resources)
router.use('/api/resources/:resourceid/shifts', function(req, res, next) {
    req.resourceid = req.params.resourceid;
    next()
}, shifts);


router.use('/api/recipes' , recipes)
router.use('/api/properties' , properties)


router.options('*', function(req,res) {
  res.sendStatus(200); // ok
});

//===== Authorized connection only from here down ======
// check token valid and setup data in req.scope from token
router.use(authorize)
router.use('/api/register' , register)
router.use('/api/users' , users );

module.exports = router;
