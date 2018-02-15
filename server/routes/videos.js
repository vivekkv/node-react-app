var router                 = require('express').Router();
var controller = require('../controllers/videos');

router.get('/', controller.get);
router.post('/', controller.addOrUpdate);
router.delete('/', controller.remove);

module.exports = router;