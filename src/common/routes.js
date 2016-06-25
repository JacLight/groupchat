import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import SignIn from './components/SignIn';
import ChatContainer from './containers/ChatContainer';
import SignUp from './components/SignUp';
import DefaultApp from './components/DefaultApp';
import App from './containers/App';
import {checkAuth} from './actions/parseActions';

const requireAuth = (nextState, replace) => {
  if(!checkAuth()) {
    return replace(null, '/signin')
  }
}
const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={DefaultApp} />
    <Route path="/welcome" component={DefaultApp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/chat" component={ChatContainer}>
    </Route>
  </Route>
);

export default Routes;
