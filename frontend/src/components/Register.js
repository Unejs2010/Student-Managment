import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password });
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;