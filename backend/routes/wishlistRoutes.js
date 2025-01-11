const express = require('express');
const { addToWishlist, getWishlist } = require('../controllers/wishlistController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/', authenticateJWT, addToWishlist); 
router.get('/', authenticateJWT, getWishlist);    

module.exports = router;
