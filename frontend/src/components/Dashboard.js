import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, addProduct } from '../api';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await addProduct(formData, token);
      alert('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/products')}>View All Products</button>
      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Dashboard;
