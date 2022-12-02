const express = require('express');
const router = express.Router();
const getDb = require("../database/dbConnection").getDb;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
    const db = getDb();
});

module.exports = router;
