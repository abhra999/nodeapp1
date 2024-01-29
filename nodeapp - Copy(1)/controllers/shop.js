const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            hasProducts: products.length > 0,
            prods: products,
            productCSS: true,
            activeShop: true
        });
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            pageTitle: 'All  Products',
            hasProducts: products.length > 0,
            prods: products,
            productCSS: true,
            activeProducts: true
        });
    });
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('shop/product-details', {
            pageTitle: 'Details',
            product: product,
            productCSS: true,
            activeProducts: true
        });
    });
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