var express = require('express');
var router = express.Router();
var ticketcontroller = require('../controller/achatticket.controller');


router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();
    
});

router.get('/', ticketcontroller.getOne);
router.post('/',ticketcontroller.addOne);

module.exports = router;


