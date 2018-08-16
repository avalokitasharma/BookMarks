const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Book');
const passport = require('passport');

//GET ALL BOOKS

router.get('/catalog',passport.authenticate('jwt', {session: false}), (req,res) => {
	const errors = {};
    Book.find()
  	.populate('books')
    .then(books => {
      if (!books) {
        errors.nobooks = 'There are no books';
        return res.status(404).json(errors);
      }
      res.json(books);
      console.log(books);
    })
    .catch(err => res.status(404).json({ book: 'There are no books' }));	
});


//BOOKS POST ROUTE
//add/create a new book in catalog

router.post('/catalog/new',
	(req,res) => {
		const bookFields = {};
		if(req.body.title) bookFields.title = req.body.title;
		if(req.body.author) bookFields.author = req.body.author;
		if(req.body.ISBN) bookFields.ISBN = req.body.ISBN;
		if(req.body.price) bookFields.price = req.body.price;
		if(req.body.image) bookFields.image = req.body.image;


		Book.findOne({title: bookFields.title, author: bookFields.author})
		.then(book => {
			if(book) {
				res.status(404).json('The book already exists in catalog');
			}
			else {
				console.log("a book added");
				new Book(bookFields).save().then(book => res.json(book));
			}
		});
});

//edit/update a book

router.post('/books/edit/',passport.authenticate('jwt', {session: false}),
	(req,res) => {
		const bookFields = {};
		if(req.body.title) bookFields.title = req.body.title;
		if(req.body.author) bookFields.author = req.body.author;
		if(req.body.ISBN) bookFields.ISBN = req.body.ISBN;
		if(req.body.price) bookFields.price = req.body.price;

		Book.findOneandUpdate(
			{$set:bookFields},
			{new: true}
			)
		.then(book => res.json(book));
});

module.exports = router;
