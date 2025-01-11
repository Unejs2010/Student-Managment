import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api';
import { purchaseProduct } from '../api';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
     
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([
            {
              id: 1,
              name: 'Wireless Headphones',
              description: 'High-quality sound with noise cancellation.',
              price: 99.99,
            },
            {
              id: 2,
              name: 'Smartwatch',
              description: 'Track your fitness and stay connected.',
              price: 199.99,
            },
            {
              id: 3,
              name: 'Gaming Laptop',
              description: 'Powerful performance for gaming enthusiasts.',
              price: 1299.99,
            },
            {
              id: 4,
              name: '4K TV',
              description: 'Experience ultra-high-definition visuals.',
              price: 499.99,
            },
            {
              id: 5,
              name: 'Bluetooth Speaker',
              description: 'Portable speaker with deep bass and clarity.',
              price: 49.99,
            },
            {
              id: 6,
              name: 'Smartphone',
              description: 'Latest technology with a stunning display.',
              price: 799.99,
            },
          ]);
        }
      } catch (error) {
      
        setProducts([
          {
            id: 1,
            name: 'Wireless Headphones',
            description: 'High-quality sound with noise cancellation.',
            price: 99.99,
          },
          {
            id: 2,
            name: 'Smartwatch',
            description: 'Track your fitness and stay connected.',
            price: 199.99,
          },
          {
            id: 3,
            name: 'Gaming Laptop',
            description: 'Powerful performance for gaming enthusiasts.',
            price: 1299.99,
          },
          {
            id: 4,
            name: '4K TV',
            description: 'Experience ultra-high-definition visuals.',
            price: 499.99,
          },
          {
            id: 5,
            name: 'Bluetooth Speaker',
            description: 'Portable speaker with deep bass and clarity.',
            price: 49.99,
          },
          {
            id: 6,
            name: 'Smartphone',
            description: 'Latest technology with a stunning display.',
            price: 799.99,
          },
        ]);
        alert('Failed to fetch products from the server. Displaying demo products.');
      }
    };
    fetchProducts();
  }, []);

  const handleBuyProduct = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await purchaseProduct(productId, token);
      alert('Product purchased successfully!');
    } catch (error) {
      alert('Failed to purchase product. Please try again.');
    }
  };

  return (
    <div className="all-products">
      <h2>All Products</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => handleBuyProduct(product.id)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
