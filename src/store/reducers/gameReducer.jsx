import { CHANGE_QUESTION } from '../actions';

const INITIAL_STATE = { questions: [] };

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_QUESTION:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
