import 'babel-polyfill';
import React from 'react';  
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes'; 
import { Provider } from 'react-redux'; 
import RootReducer from './reducers'; 
import { createStore, applyMiddleware } from 'redux';
import ConfigureStore from './store/ConfigureStore';
import reduxThunk from 'redux-thunk';  
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { purple900, blue50 } from 'material-ui/styles/colors';

const store = ConfigureStore();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: purple900,
    textColor: blue50,
  },
});

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);  

render(  
  <MuiThemeProvider muiTheme={muiTheme}>
  <Provider store={createStoreWithMiddleware(RootReducer)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
   </MuiThemeProvider>,
  document.querySelector('.container'));
