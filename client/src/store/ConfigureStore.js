import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middlewares = [ logger, thunk ];

/**
 * @return null
 */
export default function ConfigureStore(initialState) {
  return createStore(
        RootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );
}
