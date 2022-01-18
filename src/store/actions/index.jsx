export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const GET_LOGIN_INFOS = 'GET_LOGIN_INFOS';
export const GET_QUESTION = 'GET_QUESTION';
export const GET_TOKEN = 'GET_TOKEN';

export const changeQuestion = (payload) => ({ type: CHANGE_QUESTION, payload });
export const getLoginInfos = (email, name) => ({ type: GET_LOGIN_INFOS, email, name });
export const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const fetchToken = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const expiredToken = '3';
  let response = await fetch(URL);
  let tokenData = await response.json();
  if (tokenData.response_code === expiredToken) {
    response = await fetch(URL);
    tokenData = await response.json();
  }
  const { token } = tokenData;
  localStorage.setItem('token', JSON.stringify(token));
  return dispatch(getToken(token));
};

const requestNewTokenData = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const tokenData = await response.json();
  return tokenData;
};

const requestQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const questions = await response.json();
  return questions;
};

const saveToLocalStore = (tokenData) => {
  const { token } = tokenData;
  localStorage.setItem('token', JSON.stringify(token));
};

export const fetchQuestionsThunk = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    const localToken = JSON.parse(localStorage.getItem('token'));
    const questions = await requestQuestions(localToken);
    return dispatch(changeQuestion(questions));
  }

  const tokenData = await requestNewTokenData();
  saveToLocalStore(tokenData);
  const questions = await requestQuestions(tokenData.token);
  return dispatch(changeQuestion(questions));
};
