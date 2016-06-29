import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import Parse from 'parse';
import ParseReact from 'parse-react';

var parseInit;
function initParse(){
<<<<<<< Updated upstream
  Parse.initialize('Application_ID', 'JavaScript_key');
}

function parseError(error) {
  if (typeof error !== 'undefined' && typeof error.message !== 'undefined' && error.message != 'unauthorized'){
=======
  if (typeof parseInit === 'undefined'){
      parseInit = Parse.initialize('PJCCTCT3NT7ze5BHbMwXuXUUNBYQ0ds2zvxFEioO', 'e3XFBfzsMOWuKb9Kqgn7XcfYLSPwswYiajVS3fGW');
  }
}

function parseError(error) {
  if (typeof error !== 'undefined' && typeof error.message !== 'undefined'){
>>>>>>> Stashed changes
    alert(error.message);
    console.log(error);
    throw error;
  }
}

export function receiveAuth() {
  console.log('User:' + cookie.load('username'));
  const user = cookie.load('username');
  return {
    type: types.AUTH_LOAD_SUCCESS,
    user
  }
}

export function checkAuth() {
  if (cookie.load('username')) {
    console.log('User:' + cookie.load('username'));
    return true;
  }
  return false;
}

function requestSignUp() {
  return {
    type: types.AUTH_SIGNUP
  }
}

function receiveUser(username) {
  const newUser = {
    name: username,
    id: Symbol(username)
  }
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    newUser
  }
}

function requestSignOut() {
  return {
    type: types.AUTH_SIGNOUT
  }
}
function receiveSignOut() {
  return {
    type: types.AUTH_SIGNOUT_SUCCESS
  }
}

function requestSignIn() {
  return {
    type: types.AUTH_SIGNIN
  }
}

function receiveSignIn(username) {
  const user = {
    name: username,
    id: Symbol(username)
  }
  return {
    type: types.AUTH_SIGNIN_SUCCESS,
    user
  }
}

export function signOut() {
  initParse();
  return dispatch => {
    dispatch(requestSignOut())
    return Parse.User.logOut()
      .then(response => {
          cookie.remove('username')
          dispatch(receiveSignOut())
          browserHistory.push('/')
      })
      .catch(error => {
        dispatch(parseError(error))
      });
  }
}

  export function signIn(user) {
    initParse();
    return dispatch => {
      dispatch(requestSignIn())
       return Parse.User.logIn(user.email, user.password)
        .then(response => {
            cookie.save('username', user.email)
            user.username = user.email;
            user.email = user.email;
            dispatch(receiveSignIn(user.email));
            browserHistory.push('/chat');
        })
        .catch(error => {
          dispatch(parseError(error))
        });
    };
  }

export function signUp(user) {
  initParse();
  return dispatch => {
    dispatch(requestSignUp())
    var u = new Parse.User({
      username: user.username,
      password: user.password,
      email: user.email,
    });
    return u.signUp().then(response => {
      cookie.save('username', user.email);
      user.username = user.email;
      user.email = user.email;
      dispatch(receiveUser(user.email));
      browserHistory.push('/chat');
    })
    .catch(error => {
      dispatch(parseError(error))
    });
  }
}


export function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID
  }
}
