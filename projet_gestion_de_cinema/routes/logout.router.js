var express = require('express');
var router = express.Router();
var logoutcontroller = require('../controller/logout.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.delete('/',logoutcontroller.logout);

module.exports=router;