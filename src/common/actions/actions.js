import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import Parse from 'parse';
import ParseReact from 'parse-react';

// NOTE:Chat actions

function initParse(){
  Parse.initialize('Application_ID', 'JavaScript_key');
}

function parseError(error) {
    alert(error.message);
    console.log(error);
    throw error;
}

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

export function typing(username) {
  return {
    type: types.TYPING,
    username
  };
}

export function stopTyping(username) {
  return {
    type: types.STOP_TYPING,
    username
  };
}

export function defaultApp(username) {
  return {
    type: types.SAVE_USERNAME,
    username
  };
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  }
}

export function fetchMessages() {
  initParse();
  return dispatch => {
    dispatch(requestMessages())
    var query = new Parse.Query(ParseMessage);
    query.descending('createdAt');
    return query.find()
    .then(response => {
      var messages = new Array;
      response.forEach(item => {
        messages.push({
            id:item.id,
            text:typeof item.attributes.text !== 'undefined' ? item.attributes.text : '',
            time:typeof item.attributes.time !== 'undefined' ? item.attributes.time : '',
            userId:typeof item.attributes.userId !== 'undefined' ? item.attributes.userId : ''
          });
      });
      dispatch(receiveMessages(messages));
    })
    .catch(error => {
      dispatch(parseError(error))
    });
  }
}

function receiveMessages(json) {
  const date = moment().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    date
  }
}

function shouldFetchMessages(state) {
  const messages = state.messages.data;
  if (!messages) {
    return true
  }
}

export function fetchMessagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState())) {
      return dispatch(fetchMessages())
    }
  }
}

function loadingValidationList() {
  return {
    type: types.LOAD_USERVALIDATION
  }
}

function receiveValidationList(json) {
  return {
    type: types.LOAD_USERVALIDATION_SUCCESS,
    json
  }
}

export function usernameValidationList() {
  initParse();
  return dispatch => {
    dispatch(loadingValidationList())
    var query = new Parse.Query(Parse.User);
    query.descending('createdAt');
    return query.find()
    .then(response =>{
      return dispatch(receiveValidationList(response.map((item) => item.attributes.email)))
    })
    .catch(error => {
      dispatch(parseError(error))
    });
  }
}

var ParseMessage = Parse.Object.extend("Message");
export function createMessage(message) {
  initParse();
  return dispatch => {
    dispatch(addMessage(message))
    var parseMessage = new ParseMessage();
    parseMessage.set("text", message.text);
    parseMessage.set("userId", message.userId);
    parseMessage.set("time", message.time);
    return parseMessage.save()
    .then(response => {
      body: JSON.stringify(message)
    })
    .catch(error => {
      dispatch(parseError(error))
    });
  }
}

function changeIsMobile(isMobile) {
  return {
    type: types.CHANGE_IS_MOBILE,
    isMobile
  };
}

function changeWidthAndHeight(screenHeight, screenWidth) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight,
    screenWidth
  };
}

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    }
  };
}
