import '../common/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('react-chat');


ReactDOM.render(
  <Provider store={store}>
      <Router children={routes} history={browserHistory} />
  </Provider>,
  rootElement
);
