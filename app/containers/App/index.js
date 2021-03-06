/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from 'containers/PrivateRoute/Loadable';

import GlobalStyle from '../../global-styles';
import withPrimaryLayout from '../../layouts/PrimaryLayout';

export default function App() {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={withPrimaryLayout(HomePage)} />
        <Route exact path="/login" component={withPrimaryLayout(LoginPage)} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
