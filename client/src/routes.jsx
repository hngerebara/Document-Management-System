import React from 'react';
import { Route, IndexRoute } from 'react-router';
import jwtDecode from 'jwt-decode';
import App from './components/App';
import HomePage from './components/HomePage';
// import UsersPage from './user/UsersPage';
import AboutPage from './components/AboutPage';
import CheckinPage from './components/auth/CheckinPage';
import Signup from './components/auth/SignupPage';
// import DashBoard from './components/DashBoard';
import DocumentForm from './components/document/DocumentForm';
import DocumentsPage from './components/document/DocumentsPage';
// import ListDocuments from './components/document/ListDocuments';
// import ViewDocument from './components/document/ViewDocument';
// import  from './utils/';

const requireAuth = (nextState, replace) => {
  const token = localStorage.getItem('token');
  if (!token) {
    replace({
      pathname: '/checkin',
    });
  }
};

const isLogin = (nextState, replace) => {
  const token = localStorage.getItem('token');
  if (token) {
    replace({
      pathname: '/',
    });
  }
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
   <Route path="about" component={AboutPage} />
    <Route path="/checkin" component={CheckinPage} onEnter={isLogin} />
    <Route path="signup" component={Signup} onEnter={isLogin} />
    <Route path="documents" component={DocumentsPage} onEnter={requireAuth} />
     <Route path="/documents/new" component={DocumentForm} onEnter={requireAuth}/>
    <Route path="/documents/:id" component={DocumentForm} onEnter={requireAuth} />
     
      {/*<Route path="documents" component={ListDocuments} />
      <Route path="dashboard" component={DashBoard} />
     <Route path="documents/:id" component={ViewDocument} />
   <Route path="UsersPage" component={UsersPage} onEnter={}/>*/}
  </Route>
);


