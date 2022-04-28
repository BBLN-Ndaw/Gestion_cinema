var express = require('express');
var router = express.Router();
var historiqueController = require('../controller/historique.controller');


router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.get('/', historiqueController.getAll);

module.exports=router;