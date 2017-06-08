import 'babel-polyfill';
import React from 'react';  
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes.jsx'; 
import cookie from 'react-cookie';
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';  
import thunk from 'redux-thunk';  
import reducers from './reducers/RootReducer';  

import { AUTH_USER } from './actions/ActionTypes';

const store = createStore((state = {}) => state, applyMiddleware(thunk));
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);  
// const store = createStoreWithMiddleware(reducers);
// const token = cookie.load('token');
// if (token) {  
//   store.dispatch({ type: AUTH_USER });
// }

render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.container'));
