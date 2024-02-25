const router=require('express').Router();
const shopController = require('../controllers/shop');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', urlencodedParser, shopController.postCart);
router.post('/cart-delete-item', urlencodedParser, shopController.postCartDeleteProduct);
router.get('/orders', shopController.getOrders);
router.post('/checkout', shopController.postOrders);

module.exports=router;