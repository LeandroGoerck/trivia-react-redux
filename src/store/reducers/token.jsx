import { CHANGE_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

export default function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CHANGE_TOKEN:
    return action.payload;
  default:
    return state;
  }
}
