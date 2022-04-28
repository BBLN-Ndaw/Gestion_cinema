var express = require('express');
var router = express.Router();
var cinemacontroller = require('../controller/ajoutcommande.controller');

router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.get('/', cinemacontroller.getAll);

router.post('/',cinemacontroller.addOne);
    
module.exports = router;
