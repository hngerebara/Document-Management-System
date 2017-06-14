import 'babel-polyfill';
import React from 'react';  
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes'; 
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';
import InitialState from './store/InitialState';
import ConfigureStore from './store/ConfigureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { purple900, grey900 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: purple900,
    textColor: grey900,
  },
});

const store = ConfigureStore(InitialState);

render(  
  <MuiThemeProvider muiTheme={muiTheme}>
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
   </MuiThemeProvider>,
  document.querySelector('.container'));
