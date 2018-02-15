var router                 = require('express').Router();
var controller = require('../controllers/contact');

router.post('/', controller.sendEmail);

module.exports = router;