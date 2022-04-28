var express = require('express');
var router = express.Router();
var cinemacontroller = require('../controller/evenement.controller');


router.all('/',(req, res, next) => {

    res.statusCode = 200;
    next();

});

router.get('/', cinemacontroller.getAll);

router.post('/',cinemacontroller.addOne);
    
router.delete('/',cinemacontroller.deleteAll);

router.post('/:id',cinemacontroller.achatTicket);

router.get('/:id',cinemacontroller.getOne);

router.put('/:id',cinemacontroller.updateOne);

router.delete('/:id',cinemacontroller.deleteOne);

module.exports = router;


