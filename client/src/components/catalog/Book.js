import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Book extends Component {
	
	render() {
		const { book} = this.props;
		return (
			<div className="col-md-3 col-sm-6">
				<div className="thumbnail">
					<img src= {book.image} alt="" />
					<div className="caption">
						<h5>{book.title}</h5>
						<Link to ={`/catalog/{book._id}`} className = "btn btn-info">More Info</Link>
					</div>
				</div>
			</div>							
	     );
	}
}

export default Book;

