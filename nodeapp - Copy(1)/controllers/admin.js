const Product=require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false,
        formCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        null,
        req.body.title,
        req.body.imageUrl,
        req.body.price,
        req.body.desc
    );
    product.save();
    res.redirect('/admin/products');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
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
}

exports.postEditProduct = (req, res, next) => {
    const prodId=req.body.productId;
    const updatedTitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.desc;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedimageUrl,
        updatedPrice,
        updatedDesc
    );
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteById(prodId, () => {
        res.redirect('/admin/products');
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products)=>{
        res.render('admin/product-list',{
            pageTitle:'Admin  Products',
            hasProducts:products.length > 0,
            prods:products,
            productCSS:true,
            activeAdminProducts:true
        });
    });
}