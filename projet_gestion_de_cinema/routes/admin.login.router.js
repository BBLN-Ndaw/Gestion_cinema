var express = require('express');
var router = express.Router();
var adminCntroller = require('../controller/admin.login.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.get('/',adminCntroller.getloginAdmin);

module.exports=router;

