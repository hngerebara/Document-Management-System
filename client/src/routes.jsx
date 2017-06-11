import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/pages/HomePage';
import UsersPage from './user/UsersPage';
import AboutPage from './components/pages/AboutPage';
import Checkin from './auth/CheckinPage';
export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
   <Route path="about" component={AboutPage} />
    <Route path="checkin" component={Checkin} />
    <Route path="UsersPage" component={UsersPage} onEnter={requireAuth}/>
  </Route>
);

function requireAuth(nextState, replace) {  
  if (!sessionStorage.jwt) {
    replace({
      pathname: 'checkin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
