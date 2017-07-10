import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import CheckinPage from './components/auth/CheckinPage';
import SignupPage from './components/auth/SignupPage';
import CreateDocumentPage from './components/document/CreateDocumentPage';
import AllDocumentsPage
  from './components/document/otherDocuments/AllDocumentsPage';
import UsersDocumentsPage
  from './components/document/userDocuments/UsersDocumentsPage';
import UsersPage from './components/users/manageUsers/UsersPage';
import EditProfile from './components/users/manageUsers/EditProfile';
import NotFound from './components/NotFoundPage';

const requireAuth = (nextState, replace) => {
  const token = localStorage.getItem('token');
  if (!token) {
    replace({
      pathname: '/checkin'
    });
  }
};

const isLogin = (nextState, replace) => {
  const token = localStorage.getItem('token');
  if (token) {
    replace({
      pathname: '/'
    });
  }
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/users" component={UsersPage} onEnter={requireAuth} />
    <Route path="/checkin" component={CheckinPage} onEnter={isLogin} />
    <Route path="/signup" component={SignupPage} onEnter={isLogin} />
    <Route
      path="/documents"
      component={AllDocumentsPage}
      onEnter={requireAuth}
    />
    <Route
      path="/documents/new"
      component={CreateDocumentPage}
      onEnter={requireAuth}
    />
    <Route
      path="/editDocument/:id"
      component={CreateDocumentPage}
      onEnter={requireAuth}
    />
    <Route
      path="/users/:creatorId/documents"
      component={UsersDocumentsPage}
      onEnter={requireAuth}
    />
     <Route
      path="/users/:creatorId"
      component={EditProfile}
      onEnter={requireAuth}
    />
    <Route path="/*" component={NotFound} />
  </Route>
);
