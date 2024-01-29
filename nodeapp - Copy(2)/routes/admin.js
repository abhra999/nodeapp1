const router = require('express').Router();
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');


const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', urlencodedParser , adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', urlencodedParser , adminController.postEditProduct);
router.post('/delete-product/:productId', adminController.postDeleteProduct);

router.get('/products', adminController.getProducts);



module.exports= router;
