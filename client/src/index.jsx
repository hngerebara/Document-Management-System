import 'babel-polyfill';
import React from 'react';  
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes'; 
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';
import ConfigureStore from './store/ConfigureStore';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './components/auth/AuthActions';
import '../styles/custom.scss';

const store = ConfigureStore();
if (localStorage.token) {
  const decodedToken = jwtDecode(localStorage.token);
  // set user object with the userId
  store.dispatch(setCurrentUser({ id: decodedToken.id,
    username: decodedToken.username,
    title: decodedToken.title
  }));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.app'));
