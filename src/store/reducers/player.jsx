import { GET_LOGIN_INFOS, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN_INFOS:
    return { ...state, email: action.email, name: action.name };
  case UPDATE_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default player;
