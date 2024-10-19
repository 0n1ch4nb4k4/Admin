const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm
const productSchema = new mongoose.Schema({
    product_id: String,
    category_id: Number,
    name_product: String,
    description: String,
    price: Number,
    quantity: Number,
    image_product: String,
});

const CategorySchema = new mongoose.Schema({
    category_id: Number,
    name_category: String,
});
let Product = mongoose.model('Product', productSchema, 'product');
let Category = mongoose.model('Category', productSchema, 'category');

module.exports = {Product,Category};
