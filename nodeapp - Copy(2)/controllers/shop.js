const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then( ([rows,fieldData]) => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            hasProducts: rows.length > 0,
            prods: rows,
            productCSS: true,
            activeShop: true
        });
    })
    .catch( (err) => {
        console.log(err);
    })
    
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then( ([rows,fieldData]) => {
        res.render('shop/product-list', {
            pageTitle: 'All  Products',
            hasProducts: rows.length > 0,
            prods: rows,
            productCSS: true,
            activeProducts: true
        });
    })
    .catch( (err) => {
        console.log(err);
    })
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then( ([rows, fieldData]) => {
        res.render('shop/product-details', {
            pageTitle: 'Details',
            product: rows[0],
            productCSS: true,
            activeProducts: true
        });
    })
    .catch( (err) => {
      console.log(err);
    })
}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductDataIndex = cart.products.findIndex(prod => prod.id === product.id);
                const cartProductData = cart.products[cartProductDataIndex];
                if (cartProductData) {
                    product.qty = cartProductData.qty;
                    cartProducts.push(product);
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Cart',
                products: cartProducts,
                totalPrice : cart.totalPrice,
                hasProducts : cartProducts.length > 0,
                cartCSS: true,
                activeCart: true
            });
        })
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteById(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        activeOrders: true
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
    });
}