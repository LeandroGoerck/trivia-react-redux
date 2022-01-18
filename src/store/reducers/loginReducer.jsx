import { GET_LOGIN_INFOS } from '../actions';

const INITIAL_STATE = { email: '', name: '' };

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN_INFOS:
    return { ...state, email: action.email, name: action.name };
  default:
    return state;
  }
};

export default loginReducer;
