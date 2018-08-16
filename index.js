const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const books = require('./routes/books');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mongoose.connect("mongodb://localhost:27017/book_marks",{ useNewUrlParser: true })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log(err));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db,{useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
//app.use('/api/books',books);

const port = process.env.PORT || 5000;

app.listen(port,() => {
	console.log("BookMarks server is running");
});