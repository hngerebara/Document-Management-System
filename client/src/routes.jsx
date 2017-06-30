import React from 'react';
import { Route, IndexRoute } from 'react-router';
import jwtDecode from 'jwt-decode';
import App from './components/App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CheckinPage from './components/auth/CheckinPage';
import SignupPage from './components/auth/SignupPage';
import ManageDocumentsPage from './components/document/ManageDocumentsPage';
import AllDocumentsPage from './components/document/otherDocuments/AllDocumentsPage';
import UsersDocumentsPage from './components/document/userDocuments/UsersDocumentsPage';
import UsersPage from './components/admin/manageUsers/UsersPage';

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
   <Route path="/users" component={UsersPage} onEnter={requireAuth} />
    <Route path="/checkin" component={CheckinPage} onEnter={isLogin} />
    <Route path="/signup" component={SignupPage} onEnter={isLogin} />
    <Route path="/documents" component={AllDocumentsPage} onEnter={requireAuth} />
    <Route path="/documents/new" component={ManageDocumentsPage} onEnter={requireAuth} />
     <Route path="/editDocument/:id" component={ManageDocumentsPage} onEnter={requireAuth} />
     <Route path="/users/:creatorId/documents" component={UsersDocumentsPage} onEnter={requireAuth} />
   
      {/*<Route path="documents" component={ListDocuments} />
      <Route path="dashboard" component={DashBoard} />
     <Route path="documents/:id" component={ViewDocument} />
   <Route path="UsersPage" component={UsersPage} onEnter={}/>*/}
  </Route>
);


