import { CORRECT, GET_LOGIN_INFOS } from '../actions';

const INITIAL_STATE = { assertions: 0, gravatarEmail: '', name: '', score: 0 };

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CORRECT:
    return { ...state, assertions: action.assertions, score: action.score };
  case GET_LOGIN_INFOS:
    return { ...state, gravatarEmail: action.email, name: action.name };
  default:
    return state;
  }
};

export default player;
