var express = require('express');
var router = express.Router();
var userLoginCntroller = require('../controller/user.login.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.post('/',userLoginCntroller.loginPost);

router.get('/',userLoginCntroller. getLogin);

module.exports=router;