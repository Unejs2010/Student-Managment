import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ setProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/products',
        { name, description, date, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prev) => [...prev, res.data.product]);
      setName('');
      setDescription('');
      setDate('');
      setImage('');
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="form-container">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
