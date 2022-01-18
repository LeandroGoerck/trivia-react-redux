import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';
import token from './token';

const rootReducer = combineReducers({ gameReducer, loginReducer, token });

export default rootReducer;
