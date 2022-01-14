import { combineReducers } from 'redux';
import token from './token';
import playerLoginReducer from './playerLoginReducer';

const rootReducer = combineReducers({ thePlayer: token, playerLoginReducer });

export default rootReducer;
