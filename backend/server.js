require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes'); 

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
