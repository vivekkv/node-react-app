var router                 = require('express').Router();
var controller = require('../controllers/landingPage');

router.get('/', controller.get);
router.post('/', controller.addOrUpdate);
router.delete('/', controller.remove);
router.get('/latestProduts', controller.getLatestProducts);
router.get('/getProductVideos', controller.getProductVideos);


module.exports = router;
