// routes/users.js
const express = require('express');
const connection = require('../db/connection');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/:userId', verifyToken, (req, res) => {
    const userId = req.params.userId;
    const sql = `SELECT * FROM users WHERE id = ?`;
    connection.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error getting user details:', err);
        return res.status(500).json({ error: 'Error getting user details' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({status:"00", user: result[0] });
    });
});

router.put('/:userId', verifyToken, (req, res) => {
    const userId = req.params.userId;
    const { username, Age ,DOB,City,Contact} = req.body;
    const sql = `UPDATE users SET username = ?, Age = ?, DOB = ? ,City=? ,Contact=? WHERE id = ?`;
    connection.query(sql, [username, Age,DOB,City, Contact,userId], (err, result) => {
      if (err) {
        console.error('Error updating user details:', err);
        return res.status(500).json({ error: 'Error updating user details' });
      }
      res.json({status:"00",message: 'User details updated successfully' });
    });

});

module.exports = router;
