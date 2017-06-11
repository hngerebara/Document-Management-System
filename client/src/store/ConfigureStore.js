import { createStore, applyMiddleware } from 'redux';  
import RootReducer from '../reducers/';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function ConfigureStore(initialState) {
    return createStore(
        RootReducer,
        initialState,
        applyMiddleware(reduxImmutableStateInvariant())
    );
}
