var express = require('express');
var router = express.Router();
var adminregistercontroller = require('../controller/admin.register.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.get('/',adminregistercontroller.getadminregister);

router.post('/',adminregistercontroller.psotAdminResgister);

module.exports=router;