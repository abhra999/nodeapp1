const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false,
        formCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const descrp = req.body.descrp;

    const product = new Product({
        title: title,
        price: price,
        descrp: descrp,
        imageUrl: imageUrl,
        userId: req.user._id
    });
        product
        .save()
        .then(() => {
            //console.log('product created');
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product
    .findById(prodId)
        .then((product) => {

            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                editing: editMode,
                product: product,
                formCSS: true,
                activeAdminProducts: true,
            });

        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postEditProduct = (req, res, next) => {

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescrp = req.body.descrp;

    Product
    .findById(prodId)
    .then((product) =>{
       product.title = updatedTitle,
       product.price = updatedPrice,
       product.descrp = updatedDescrp,
       product.imageUrl = updatedimageUrl
       return product.save()
    })
    .then((result) =>{
            //console.log('product updated');
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product
    .findByIdAndDelete(prodId)
    .then(()=>{
        console.log('product deleted');
        res.redirect('/admin/products');
    })
    .catch((err) =>{
        console.log(err);
    })
}

exports.getProducts = (req, res, next) => {
    Product
        .find()
        // .select('title descrp -_id')
        // .populate('userId', 'name email')
        .populate('userId')
        .then((products) => {
            console.log(products)
            res.render('admin/product-list', {
                pageTitle: 'Admin  Products',
                hasProducts: products.length > 0,
                prods: products,
                productCSS: true,
                activeAdminProducts: true
            })
        }).catch((err) => {
            console.log(err);
        });
}