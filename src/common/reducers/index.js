import messages from './messages';
import auth from './auth';
import typers from './typers';
import defaultApp from './defaultApp';
import userValidation from './userValidation';
import environment from './environment';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  messages,
  auth,
  typers,
  defaultApp,
  userValidation,
  environment,
  formReducer
});

export default rootReducer;
