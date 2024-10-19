const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../Model/product.js')


// Cấu hình để sử dụng thư mục public cho ảnh tĩnh
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cấu hình multer để lưu file vào thư mục public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads')); // Lưu vào thư mục public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Đặt tên file với timestamp
  },
});

const upload = multer({ storage: storage });



// post add product
router.post('/FormAddProduct/alert',upload.single('image_product'), async (req,res)=>{
    const { product_id,category_id,name_product, description, price ,quantity} = req.body;
    const image_product = req.file;
  
    if (!image_product) {
        return res.send('Vui lòng tải lên một hình ảnh.');
    }
  
    // Tạo đối tượng sản phẩm mới
    const newProduct = new Product({
        product_id: product_id,
        category_id: category_id,
        name_product: name_product,
        description: description,
        price: price,
        quantity: quantity,
        image_product: '/uploads/' + image_product.filename // Lưu đường dẫn ảnh
    });
  
    // Lưu sản phẩm vào MongoDB
    await newProduct.save()
        .then(() => {
            res.json(newProduct)
        })
        .catch(err => {
          res.json(err)
            // res.send('Có lỗi xảy ra khi thêm sản phẩm!');
            console.log(err);
        });
});

module.exports = router;
