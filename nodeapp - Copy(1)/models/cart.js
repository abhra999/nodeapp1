const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');


const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalParice = 0;
  }
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      let existingProductIndex;
      let existingProduct;
      if(cart.products) {
         existingProductIndex = cart.products.findIndex(prod => prod.id === id);
         existingProduct = cart.products[existingProductIndex]; 
      }     
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      }
      else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) console.log(err);
      })
    })
  }
  static deleteById(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      let updatedCart = { ...cart };
      let product;
      if (updatedCart.products) {
        product = updatedCart.products.find(prod => prod.id === id);
      }
      if (product) {
        const productQty = product.qty;
        updatedCart.totalPrice = updatedCart.totalPrice - (productQty * productPrice);
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
        fs.writeFile(p, JSON.stringify(updatedCart), err => {
          if (err) console.log(err);
        })
      }
    })
  }
  static getCart(cb) {
     fs.readFile(p, (err,fileContent) => {
        if(err) return cb({products : [], totalParice : 0});
        const cart = JSON.parse(fileContent);
        if(!cart.products)
          return cb({products : [], totalParice : 0});
        return cb(cart);
     });
  }

}