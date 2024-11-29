const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router(); 
const {validateUser}=require('../middleware/auth');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    res.redirect('/listings');
});

module.exports = router;
