const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};