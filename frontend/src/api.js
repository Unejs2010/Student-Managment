import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5002/api' });

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getProducts = () => API.get('/products');
export const addProduct = (data, token) =>
  API.post('/products', data, { headers: { Authorization: token } });
export const getWishlist = () => API.get('/wishlist');
export const addToWishlist = (data, token) =>
  API.post('/wishlist', data, { headers: { Authorization: token } });
export const purchaseProduct = (productId, token) =>
    API.post('/products/purchase', { productId }, { headers: { Authorization: token } });
  

  
