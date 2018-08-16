import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearBooks } from './actions/bookActions';


import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Catalog from './components/catalog/Catalog';
import AddBook from './components/catalog/AddBook';


import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear books
    store.dispatch(clearBooks());
        // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component = {Landing} />
          <div className="container">
          	<Route exact path="/login" component = {Login} />
          	<Route exact path="/signup" component = {Signup} />
            <Switch>
              <PrivateRoute exact path="/catalog" component = {Catalog} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/catalog/new" component = {AddBook} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    );
  }
}
export default App;
