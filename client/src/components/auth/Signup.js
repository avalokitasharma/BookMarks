import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Signup extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
	    if (this.props.auth.isAuthenticated) {
	      this.props.history.push('/catalog');
	    }
	}

	componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
	  }
	}

	onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const newUser = {
			name:this.state.name,
			email:this.state.email,
			password2:this.state.password2,
			password:this.state.password
		};

		this.props.registerUser(newUser, this.props.history);
	}

  render() {
  	const { errors } = this.state;

    return (
      <div className="signup">
	    <div className="container">
	      <div className="row">
	        <div className="col-md-8 m-auto">
	          <h1 className="display-4 text-center">Sign Up</h1>
	          <p className="lead text-center">Create your BookMarks account</p>
	          <form noValidate onSubmit={this.onSubmit}>
	            <div className="form-group">
	              <input type="text" 
	              className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                  })}
	              placeholder="Name" 
	              name="name"
	              value={this.state.name} 
	              onChange={this.onChange} 
	              />
	              {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
	            </div>
	            <div className="form-group">
	              <input type="email" 
	              className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                  })} 
	              placeholder="Email Address" 
	              name="email"
	              value={this.state.email}
	              onChange={this.onChange} 
	              />
	              {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}         
	            </div>
	            <div className="form-group">
	              <input type="password" 
	              className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                  })}
	              placeholder="Password" 
	              name="password" 
	              value={this.state.password}
	              onChange={this.onChange} 
	              />
	              {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
	            </div>
	            <div className="form-group">
	              <input type="password" 
	              className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                  })} 
	              placeholder="Confirm Password" 
	              name="password2" 
	              value={this.state.password2}
	              onChange={this.onChange} 
	              />
	              {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
