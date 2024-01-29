const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    const exists = fs.existsSync(p);
    if(exists){
        fs.readFile(p, (err, fileContent) => {
            if (err) cb([]);
            cb(JSON.parse(fileContent));
        })
    }
    else{
        cb([]);
    }
}

module.exports = class Product {
    constructor(id,title,imageUrl,price,desc) {
        this.id = id;
        this.title = title;
        this.imageUrl=imageUrl;
        this.price=Number(price);
        this.desc=desc;
    }
    save() {
        getProductsFromFile((products) => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (err) console.log(err);
                })
            }
            else {
                this.id = String(Math.floor(1000 + Math.random() * 9000));
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) console.log(err);
                })
            }
        })
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static findById(id,cb) {
        getProductsFromFile((products) => {
           const product = products.find(p => p.id===id);
           cb(product);
        })
    }
    static deleteById(id, cb) {
        getProductsFromFile(products => {
            const deletedProduct = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteById(id, deletedProduct.price);
                }
            })
            cb();
        });
    }
}