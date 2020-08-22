/**
 * Login the user
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USER } from 'containers/LoginPage/constants';
import { userLoaded, userLoadingError } from 'containers/LoginPage/actions';

import request from 'utils/request';
// import { makeSelectJWT } from 'containers/LoginPage/selectors';

/**
 * Github user request/response handler
 */
export function* loadUserData() {
  // Select jwt from store
  const accessToken = localStorage.getItem('access_token');
  const requestURL = `/api/v1/auth/google`;
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_token: accessToken,
    }),
  };
  try {
    // Call our request helper (see 'utils/request')
    const { user } = yield call(request, requestURL, requestOptions);
    console.log(user);
    yield put(userLoaded(user));
  } catch (err) {
    yield put(userLoadingError(err));
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
