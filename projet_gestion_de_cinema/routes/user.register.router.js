var express = require('express');
var router = express.Router();
var userregistercontroller = require('../controller/user.register.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});
router.get('/',userregistercontroller.getUserregister);

router.post('/',userregistercontroller.psotUserResgister);

module.exports=router;