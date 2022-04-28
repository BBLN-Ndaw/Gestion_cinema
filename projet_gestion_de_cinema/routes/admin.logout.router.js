var express = require('express');
var router = express.Router();
var adminlogoutcontroller = require('../controller/admin.logout.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.delete('/',adminlogoutcontroller.adminLogout);

module.exports=router;