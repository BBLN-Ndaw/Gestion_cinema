var express = require('express');
var router = express.Router();
var adminCntroller = require('../controller/adminController');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.post('/',adminCntroller.addOne);

router.get('/',adminCntroller.getone);

module.exports=router;

