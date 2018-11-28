'use strict'
require('dotenv').load();

const express = require('express');
const knex = require('../knexfile');
const helpers = require('../misc/helpers');
const router = express.Router();

// post /steps 
router.post('/ispostback', async function(req, res) {
    //console.log(req.body.regtoken)
    knex("registrations").where({ uniq: req.body.regtoken })
    .then((rows) => {
        if (rows.length==1) {
            let step = rows[0]["step"] + 1;
            let firstname = rows[0]["firstname"]; 
            let lastname = rows[0]["lastname"];
            res.json({status: "ok",data:{step: step,firstname: firstname,lastname: lastname}})
            //res.send();
        }
    })
    .catch(function(e) {
        //console.log(e)
        res.status(401).json({
            status: "error",
            error_type: "regerr",
            message: "general"
        })
    })
})

router.post('/1', async function(req, res) {
    let salt = helpers.cryptoRandomBytes(128);
    let pwd = salt.slice(57,65);
    //console.log("in step1")
    let sha256 = await helpers.GetHashBySalt(pwd, salt, process.env.PASSWORD_FORMAT)

    let insert1 = {
        uniq: sha256, 
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        step: 1
        
    }
    knex.insert(insert1).into("registrations").then(function (id) {
        //console.log("step1 new id: ",id);
        res.json({status: "ok",data:sha256})
    }).catch(function(e) {
        res.status(401).json({
            status: "error",
            error_type: "regerr",
            message: "general"
        })
    })
})

router.post('/2', async function(req, res) {
    let update2 = {
        phone: req.body.phone, 
        email: preq.body.email,
        step: 2
        
    }
    knex('registrations')
    .where({ uniq: req.body.regtoken })
    .update(update2)
    .then(function (id) {
        //console.log(id);
        res.send(id)
    }).catch(function(e) {
        res.status(401).json({
            status: "error",
            error_type: "regerr",
            message: "general"
        })
    })
})


router.post('/3', async function(req, res) {
    let update3 = {
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode,
        step: 3
    }
    knex('registrations')
    .where({ uniq: req.body.regtoken })
    .update(update3)
    .then(function (id) {
        //console.log(id);
        res.send(id)
    }).catch(function(e) {
        res.status(401).json({
            status: "error",
            error_type: "regerr",
            message: "general"
        })
    })
})

module.exports = router
