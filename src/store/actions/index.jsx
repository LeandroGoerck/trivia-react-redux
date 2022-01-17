export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const GET_LOGIN_INFOS = 'GET_LOGIN_INFOS';
export const GET_QUESTION = 'GET_QUESTION';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';

export const changeToken = (payload) => ({
  type: CHANGE_TOKEN,
  payload,
});

export const getLoginInfosAction = (name, email) => ({
  type: GET_LOGIN_INFOS,
  name,
  email,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export function fetchToken() {
  return async (dispatch) => {
    // dispatch(requestToken());
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const EXPIRED_TOKEN = '3';
    let response = await fetch(URL);
    let tokenData = await response.json();
    if (tokenData.response_code === EXPIRED_TOKEN) {
      response = await fetch(URL);
      tokenData = await response.json();
    }
    const { token } = tokenData;
    // console.log(response_code);
    localStorage.setItem('token', JSON.stringify(token));
    return dispatch(changeToken(token));
  };
}

const requestQuestion = () => ({
  type: GET_QUESTION,
});

export const changeQuestion = (payload) => ({
  type: CHANGE_QUESTION,
  payload,
});

export const fetchQuestionsThunk = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    const localToken = JSON.parse(localStorage.getItem('token'));
    console.log({ localToken });
    try {
      const URL = `https://opentdb.com/api.php?amount=5&token=${localToken}`;
      const response = await fetch(URL);
      const questions = await response.json();
      // console.log(questions);
      return dispatch(changeQuestion(questions));
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Token não existe na localStorage');
  }
};
