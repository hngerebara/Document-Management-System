import React from 'react';
import { Route, IndexRoute } from 'react-router';
import jwtDecode from 'jwt-decode';
import App from './components/App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CheckinPage from './components/auth/CheckinPage';
import Signup from './components/auth/SignupPage';
// import DashBoard from './components/DashBoard';
import ManageDocumentpage from './components/document/ManageDocumentpage';
import DocumentsPage from './components/document/DocumentsPage';
import GetUsers from './components/Admin/GetUsers';



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
   <Route path="/users" component={GetUsers} onEnter={requireAuth} />
    <Route path="/checkin" component={CheckinPage} onEnter={isLogin} />
    <Route path="signup" component={Signup} onEnter={isLogin} />
    <Route path="documents" component={DocumentsPage} onEnter={requireAuth} />
     <Route path="/documents/:id" component={ManageDocumentpage} onEnter={requireAuth} />
   
      {/*<Route path="documents" component={ListDocuments} />
      <Route path="dashboard" component={DashBoard} />
     <Route path="documents/:id" component={ViewDocument} />
   <Route path="UsersPage" component={UsersPage} onEnter={}/>*/}
  </Route>
);


