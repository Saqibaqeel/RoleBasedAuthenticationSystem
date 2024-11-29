const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {validateUser}=require('../middleware/auth')

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });

  await user.save();
  req.flash('success', 'Account created successfully');
  res.redirect('/login');
});

module.exports = router;
