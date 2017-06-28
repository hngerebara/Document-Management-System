import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from '../reducers/Index';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default function ConfigureStore(initialState) {
  return createStore(
        RootReducer,
        initialState,
        compose(
           applyMiddleware(thunk),
         window.devToolsExtension ? window.devToolsExtension() : f => f));
}

