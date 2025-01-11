const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const authenticateJWT = require('../middleware/authenticateJWT');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const { purchaseProduct } = require('../controllers/productController');

router.post('/purchase', authenticateJWT, purchaseProduct);


router.post('/', authenticateJWT, upload.single('image'), createProduct);
router.get('/', getProducts);

module.exports = router;