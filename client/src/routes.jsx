import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/pages/HomePage.jsx';
import DocumentList from './components/documents/DocumentList.jsx';
import AboutPage from './components/pages/AboutPage.jsx';
import Checkin from './components/pages/checkin/CheckinPage.jsx';
import Signup from './components/pages/signup/SignupPage.jsx';
// import NotFoundPage from './components/pages/not-found-page';
// import CreateDocument from './components/CreateDocument.jsx';
// import EditDocument from './components/EditDocument.jsx';
// import ViewDocument from './components/ViewDocument.jsx';
// import Register from './components/auth/Register.jsx';
// import Login from './components/auth/Login.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import RequireAuth from './components/auth/RequireAuth.jsx';

export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="signup" component={Signup} />
    <Route path="checkin" component={Checkin} />
  </Route>
);
  
  //  <Route path="create-document" component={CreateDocument} />
  //  <Route path="documents" component={DocumentList} /> 

//  <Route path="register" component={Register} />
//     <Route path="login" component={Login} />
//     <Route path="dashboard" component={RequireAuth(Dashboard)} />  

    // <Route path="*" component={NotFoundPage} />