import { GET_LOGIN_INFOS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const playerLoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN_INFOS:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
};

export default playerLoginReducer;
