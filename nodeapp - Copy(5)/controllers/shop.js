const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
    Product
    .find()
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
        .find()
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
        .populate('cart.items.productId')
        .then((user) => {
            const products = user.cart.items;
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
    .removeFromCart(prodId)
    .then(() => {
       console.log('Deleted');
       res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id })
    .then((orders) => {
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
      .populate('cart.items.productId')
      .then((user) => {
        const products = user.cart.items.map(i => {
            return {product: {...i.productId._doc}, quantity: i.quantity}
        })
         const order = new Order({
            products: products,
            user: {
                name: req.user.name,
                userId: req.user._id
            }
        })
        return order.save();
      })
      .then((result) => {
         console.log('order completed');
         return req.user.clearCart()
      })
      .then(() => {
        res.redirect('/orders');
      })
      .catch(err => {
        console.log(err);
      })
}
