const Product = require('../models/product');


exports.getIndex = (req, res, next) => {
    Product
    .fetchAll()
        .then((products) => {
            res.render('shop/index', {
                pageTitle: 'Shop',
                hasProducts: products.length > 0,
                prods: products,
                productCSS: true,
                activeShop: true
            });
        }).catch((err) => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Product
        .fetchAll()
        .then((products) => {
            res.render('shop/product-list', {
                pageTitle: 'Products',
                hasProducts: products.length > 0,
                prods: products,
                productCSS: true,
                activeShop: true
            });
        }).catch((err) => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product
        .findById(productId)
        .then((product) => {
            res.render('shop/product-details', {
                pageTitle: 'Details',
                product: product,
                productCSS: true,
                activeProducts: true
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((products) => {
                    res.render('shop/cart', {
                        pageTitle: 'Cart',
                        products: products,
                        totalPrice: 0,
                        hasProducts: products.length > 0,
                        cartCSS: true,
                        activeCart: true
                    });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then((product) => {
       return req.user.addToCart(product);

    })
    .then((result) => {
      // console.log(result);
       res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .deleteItemFromCart(prodId)
    .then(() => {
       console.log('Deleted');
       res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getOrders = (req, res, next) => {
    req.user
    .getOrders()
    .then((orders) => {
        console.log(orders)
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            hasOrders: orders.length > 0,
            activeOrders: true,
            orders : orders
        });
    })
    .catch(err  => {
        console.log(err);
    })
}

exports.postOrders = (req, res, next) => {
      req.user
      .addOrder()
      .then((result) => {
         console.log('order completed');
         res.redirect('/orders');
      })
      .catch(err => {
        console.log(err);
      })
}
