import { combineReducers } from 'redux';
import token from './token';
import playerLoginReducer from './playerLoginReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({ token, playerLoginReducer, gameReducer });

export default rootReducer;
