import axios from 'axios';
import { GET_BOOKS,CLEAR_BOOKS, GET_ERROR, ADD_BOOK } from '../types';

// get books

export const getBooks = () => dispatch => {
	axios.get('/api/users/catalog')
	.then(res =>
		dispatch({
			type: GET_BOOKS,
			payload: res.data
		})
	)
	.catch(err =>
		dispatch({
			type: GET_BOOKS,
			payload: {}
		})
	);
}

// add a new book to catalog

export const addNewBook = (newBook, history) => dispatch => {
  axios.post('/api/users/catalog/new', newBook)
	 .then(res => history.push('/catalog'))
  	 .catch(err => console.log(err));
   
};

//clear Books

export const clearBooks = () => {
	return {
		type: CLEAR_BOOKS
	};
};
