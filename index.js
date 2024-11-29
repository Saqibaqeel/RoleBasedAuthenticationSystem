const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressError=require('./utility/expressError')
const session = require('express-session');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const path = require('path');
const dotenv = require('dotenv');

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const listingRoutes = require('./routes/listingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

const URL = 'mongodb://127.0.0.1:27017/rolesProduct';
main()
  .then(() => {
    console.log('connection success');
  })
  .catch((e) => {
    console.log(e);
  });

async function main() {
  await mongoose.connect(URL);
}

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/listings', listingRoutes);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/listings');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

app.all('*', (req, res, next) => {
  next(new expressError(404,"page not found"));
});


app.use((err, req, res, next) => {
  const { statuscode = 500, message = "Page not found" } = err;
  res.status(statuscode).render('error.ejs', { err });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
