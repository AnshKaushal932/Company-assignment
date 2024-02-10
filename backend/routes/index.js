// routes/index.js
const express = require('express');
const authRoutes = require('../middleware/auth');
const userRoutes = require('./users');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
