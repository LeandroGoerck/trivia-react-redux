export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';

export const changeToken = (payload) => ({
  type: CHANGE_TOKEN,
  payload,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const tokenData = await response.json();
    const { token } = tokenData;
    localStorage.setItem('token', JSON.stringify(token));
    return dispatch(changeToken(token));
  };
}
