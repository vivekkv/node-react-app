var router                 = require('express').Router();
var controller = require('../controllers/users');

router.post('/login', controller.login);

module.exports = router;