import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import Parse from 'parse';
import ParseReact from 'parse-react';

function initParse(){
  Parse.initialize('PJCCTCT3NT7ze5BHbMwXuXUUNBYQ0ds2zvxFEioO', 'e3XFBfzsMOWuKb9Kqgn7XcfYLSPwswYiajVS3fGW');
}

var subscription;
function getSubscription(){
    if (typeof subscription === 'undefined' || subscription == null){
      var query = new Parse.Query('Message');
      subscription = query.subscribe();

      subscription.on('open', () => {
       console.log('subscription opened');
      });
    }
}

function parseError(error) {
    alert(error.message);
    console.log(error);
    throw error;
}


export function sendMessage(message) {
  console.log(message);
  getSubscription().on('create', (object) => {
    console.log('object creates');
  });
}

export function updateMessage() {
  console.log(message);
  getSubscription().on('update', (object) => {
    console.log('object updated');
  });
}

export function deleteMessage() {
  console.log(message);
  getSubscription().on('delete', (object) => {
    console.log('object deleted');
  });
}

export function closeSubscription() {
  console.log(message);
  getSubscription().on('close', (object) => {
    console.log('object closed');
  });
}
