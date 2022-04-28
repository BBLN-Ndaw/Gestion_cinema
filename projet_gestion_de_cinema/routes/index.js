var express = require('express');
var router = express.Router();
var adminCntroller = require('../controller/index.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.get('/',adminCntroller.getindex);

module.exports=router;
