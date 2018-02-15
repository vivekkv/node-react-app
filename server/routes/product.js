var router                 = require('express').Router();
var controller = require('../controllers/product');

router.get('/', controller.get);
router.get('/getProducts', controller.getProducts);
router.post('/', controller.addOrUpdate);
router.delete('/', controller.remove);
router.get("/productInfo",  controller.getProductInfo);
router.get("/images",  controller.getProductImages);
router.get("/videos",  controller.getProductVideos);
router.post("/ratings", controller.ratings);
module.exports = router;