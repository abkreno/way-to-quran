/**
 * Login the user
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USER } from 'containers/LoginPage/constants';
import { userLoggedIn, userLoginError } from 'containers/LoginPage/actions';

import request from 'utils/request';
// import { makeSelectJWT } from 'containers/LoginPage/selectors';

/**
 * Github user request/response handler
 */
export function* loadUserData() {
  // Select jwt from store
  const jwt = localStorage.getItem('jwt');
  const requestURL = `/api/login`;
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(request, requestURL, requestOptions);
    yield put(userLoggedIn(user));
  } catch (err) {
    yield put(userLoginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userData() {
  // Watches for LOAD_USER actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USER, loadUserData);
}
