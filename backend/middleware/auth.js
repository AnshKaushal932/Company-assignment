// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../db/connection');

const router = express.Router();

const JWT_SECRET = 'your_secret_key'; 

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Check if email already exists in the database
  const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ status:"01",success:"false",msg: 'Error signing up' });
    }
    if (result.length > 0) {
      // If email already exists, return error
      return res.status(400).json({ status:"02",success:"false",msg: 'Email already exists' });
    }
    // If email doesn't exist, proceed with signup
    const insertUserQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    connection.query(insertUserQuery, [username, email, password], (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        return res.status(500).json({ error: 'Error signing up' });
      }
      res.status(201).json({status:"00",success:"true", msg: 'User signed up successfully' });
    });
  });
});

router.post('/login', (req, res) => {
  console.log("in routher")
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    connection.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({status:"01",success:"false" ,msg: 'Error logging in' });
      }
      if (result.length === 0) {
        return res.status(401).json({status:"02",success:"false", msg: 'Invalid email or password' });
      }
      
 
      const user = result[0];
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
      res.json({status:"00",success:"true", message: 'Login successful', token });
    });
});

module.exports = router;
