import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewBook } from '../../actions/bookActions';


class AddBook extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			author: '',
			ISBN: '',
			price: '',
			image: '',
			errors:{}
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
			this.setState({[event.target.name]:event.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const newBook = {
			title:this.state.title,
			author:this.state.author,
			ISBN:this.state.ISBN,
			price:this.state.price,
			image:this.state.image
		};

		this.props.addNewBook(newBook, this.props.history);
	}

	render() {
		return (
	      <div className="addbook">
	        <div className="container">
	          <div className="row">
	            <div className="col-md-8 m-auto">
	              <h2 className="display-4 text-center">Add a book to catalog</h2>
	              <form onSubmit={this.onSubmit}>
	                <div className="form-group">
	                  <input
	                    type="title"
	                    className="form-control form-control-lg"
	                    placeholder="Book title"
	                    name="title"
	                    value={this.state.title}
	                    onChange={this.onChange} />
	                </div>
	                <div className="form-group">
	                  <input
	                    type="author"
	                    className="form-control form-control-lg"
	                    placeholder="Author Name"
	                    name="author"
	                    value={this.state.author}
	                    onChange={this.onChange} />
	                </div>
	                <div className="form-group">
	                  <input
	                    type="ISBN"
	                    className="form-control form-control-lg"
	                    placeholder="Book ISBN"
	                    name="ISBN"
	                    value={this.state.ISBN}
	                    onChange={this.onChange} />
	                </div>
	                <div className="form-group">
	                  <input
	                    type="price"
	                    className="form-control form-control-lg"
	                    placeholder="Book Price"
	                    name="price"
	                    value={this.state.price}
	                    onChange={this.onChange} />
	                </div>
	                <div className="form-group">
	                  <input
	                    type="text"
	                    className="form-control form-control-lg"
	                    placeholder="Book cover image"
	                    name="image"
	                    value={this.state.image}
	                    onChange={this.onChange} />
	                </div>
	                <input type="submit" className="btn btn-info btn-block mt-4" />
	              </form>
	            </div>
	          </div>
	        </div>
	      </div>
	    );
	}
}

export default connect(null,{addNewBook})(AddBook);

