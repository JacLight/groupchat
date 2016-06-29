import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import Parse from 'parse';
import ParseReact from 'parse-react';

var parseInit;
function initParse(){
  if (typeof parseInit === 'undefined'){
      parseInit = Parse.initialize('PJCCTCT3NT7ze5BHbMwXuXUUNBYQ0ds2zvxFEioO', 'e3XFBfzsMOWuKb9Kqgn7XcfYLSPwswYiajVS3fGW');
  }
}

var subscription;
function getSubscription(){
  initParse();
    if (typeof subscription === 'undefined' || subscription == null){
      var query = new Parse.Query('Message');
      subscription = query.subscribe();

      subscription.on('open', () => {
       console.log('subscription opened');
      }).on('create', (object) => {
         console.log(object + ' object creates');
      }).on('update', (object) => {
         console.log(object + ' object updated');
      });
    }
}

function parseError(error) {
    alert(error.message);
    console.log(error);
    throw error;
}

export function subscribeToMessageUpdate(){
  getSubscription();
}

export function unSubscribeToMessageUpdate(){
  getSubscription().unsubscribe();
}
