var express = require('express');
var router = express.Router();
var adminController = require('../controller/modifevenement.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});


router.get('/',adminController.getAll);

router.post('/:id',adminController.updateOne);

module.exports=router;