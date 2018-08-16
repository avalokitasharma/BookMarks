import { GET_BOOKS, CLEAR_BOOKS, ADD_BOOK } from '../types';

const initialState = {
	book: null,
	books: null
}

export default function(state = initialState,action){
	switch(action.type){
		case GET_BOOKS:
			return {
				...state,
				books:action.payload
			};
		case CLEAR_BOOKS:
			return {
				...state,
				books: null
			};
		case ADD_BOOK:
			return {
				...state,
				book: action.payload
			};
		default:
			return state
	}
}