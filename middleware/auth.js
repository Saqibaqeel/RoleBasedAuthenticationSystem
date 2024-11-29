const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {userValidationSchema,istingValidationSchema }=require('../schema')
const expressError=require('../utility/expressError')


const authenticate = async (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    req.flash('error', 'You need to log in first.');
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findById(decoded.id); 
    next(); 
  } catch (error) {
    return res.status(400).send('Invalid or expired token');
  }
};


const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).send('You do not have permission to perform this action');
  }
  next(); 
};


const authorizeUser = (req, res, next) => {
  if (req.user.role !== 'User') {
    return res.status(403).send('You do not have permission to perform this action');
  }
  next(); 
  
};
const validateListing=(req,res,next)=>{
  let {err} =istingValidationSchema.validate(req.body);
  if(err){
      throw new expressError(404,"validation error")
  }
  else{
      next()
  }
 

}
const validateUser=(req,res,next)=>{
  let {err} = userValidationSchema.validate(req.body);
  if(err){
      throw new expressError(404,"validation error")
  }
  else{
      next()
  }
 

}

module.exports = { authenticate, authorizeAdmin, authorizeUser ,validateListing, validateUser};
