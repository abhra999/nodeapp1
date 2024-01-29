const db = require('../util/database');
const Cart = require('./cart');


module.exports = class Product {
    constructor(id,title,imageUrl,price,descrp) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = Number(price);
        this.descrp = descrp;
    }
    save() {
       return db.execute(
        'INSERT INTO PRODUCTS (title, price, descrp, imageUrl) VALUES (?, ?, ?, ?)', 
              [this.title, this.price, this.descrp, this.imageUrl] 
              );
    }
    static fetchAll() {
      return db.execute('SELECT * FROM PRODUCTS');
    }
    static findById(id) {
      return db.execute('SELECT * FROM PRODUCTS WHERE PRODUCTS.ID = ?',[id]);
    }
    static deleteById(id) {
        
    }
}