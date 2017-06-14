import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
// import UsersPage from './user/UsersPage';
import AboutPage from './components/AboutPage';
import CheckinPage from './components/auth/CheckinPage';
import Signup from './components/auth/SignupPage';
// import DashBoard from './components/DashBoard';
import CreateDocument from './components/document/CreateDocument';
import DocumentsPage from './components/document/DocumentsPage';
// import ListDocuments from './components/document/ListDocuments';
// import ViewDocument from './components/document/ViewDocument';


function requireAuth(nextState, replace, callback) {
  const token = localStorage.getItem('token');
  if (!token) {
    replace({
      pathname: '/checkin'
    });
  }
}

export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
   <Route path="about" component={AboutPage} />
    <Route path="checkin" component={CheckinPage} />
    <Route path="signup" component={Signup} />
    <Route path="documents" component={DocumentsPage} />
     <Route path="documents/new" component={CreateDocument} />
     
      {/*<Route path="documents" component={ListDocuments} />
      <Route path="dashboard" component={DashBoard} />
     <Route path="documents/:id" component={ViewDocument} />
   <Route path="UsersPage" component={UsersPage} onEnter={requireAuth}/>*/}
  </Route>
);


