const pool = require('../db');

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    await pool.query('INSERT INTO products (name, description, price, image, user_email) VALUES (?, ?, ?, ?, ?)', [
      name,
      description,
      price,
      image,
      req.user.email
    ]);

    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products');
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.purchaseProduct = async (req, res) => {
    const { productId } = req.body;
    const userEmail = req.user.email;
  
    try {
      
      await pool.query('INSERT INTO purchases (user_email, product_id) VALUES (?, ?)', [
        userEmail,
        productId,
      ]);
  
      res.status(200).json({ message: 'Product purchased successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to purchase product.' });
    }
  };
  