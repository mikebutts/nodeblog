require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

// connect to mongodb & listen for requests
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT || 80))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});