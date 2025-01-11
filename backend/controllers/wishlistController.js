const pool = require('../db');

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userEmail = req.user.email;  

  try {
   
    const [existingWishlistItem] = await pool.query(
      'SELECT * FROM wishlist WHERE user_email = ? AND product_id = ?',
      [userEmail, productId]
    );

    if (existingWishlistItem.length > 0) {
      return res.status(400).json({ message: 'Product already in your wishlist' });
    }

   
    await pool.query('INSERT INTO wishlist (user_email, product_id) VALUES (?, ?)', [userEmail, productId]);
    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getWishlist = async (req, res) => {
  const userEmail = req.user.email;

  try {

    const [wishlist] = await pool.query(
      'SELECT products.* FROM wishlist JOIN products ON wishlist.product_id = products.id WHERE wishlist.user_email = ?',
      [userEmail]
    );

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
