import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Book from './Book';
import { getBooks } from '../../actions/bookActions';

class Catalog extends Component {
	componentDidMount(){
		this.props.getBooks();
	}

	render(){
		const { user } = this.props.auth;
		const { books } = this.props.books;
		let bookArray;
		
		if(books === null){
			bookArray = <h4>You have not yet added any book, please add some</h4>;
		} else {
			if (books.length>0) {	
				bookArray = books.map(book =>(
						<Book key={book._id} book={book} />
					))
		    } 
		}
	    

		return(
			<div>
				<div className="container">
					<header className="jumbotron">
						<div className="container">
							<h1>Welcome to BookMarks!!</h1>
							<p>Indie titles for your consideration!</p>
							<Link to="/catalog/new" className="btn btn-lg btn-light">
			                  Add New Book
			                </Link>
						</div>
					</header>
				</div>
				<div className="row text-center">
					<div className="col-md-3 col-sm-6">
						{bookArray}
					</div>
				</div>	
			</div>
		);
	}
}

const mapStateToProps = state => ({
	books: state.books,
	auth: state.auth
});

export default connect(mapStateToProps,{ getBooks })(Catalog);

