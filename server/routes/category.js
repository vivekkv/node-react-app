var router                 = require('express').Router();
var controller = require('../controllers/category');

router.get('/', controller.get);
router.post('/', controller.addOrUpdate);
router.delete('/', controller.remove);
router.get("/getCategories", controller.getCategories);

module.exports = router;