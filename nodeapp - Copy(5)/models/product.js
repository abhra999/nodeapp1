const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    descrp: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }   
})

module.exports = mongoose.model('Product', productSchema);