import { combineReducers } from 'redux';
import player from './player';
import gameReducer from './gameReducer';
import token from './token';

const rootReducer = combineReducers({ gameReducer, player, token });

export default rootReducer;
