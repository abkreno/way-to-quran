/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from './constants';

/**
 * Start the login, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGIN_USER
 */
export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

/**
 * Dispatched when the login is loaded by the request saga
 *
 * @param  {object} user The user data
 *
 * @return {object}      An action object with a type of LOGIN_USER_SUCCESS passing the user
 */
export function userLoggedIn(user) {
  return {
    type: LOGIN_USER_SUCCESS,
    user,
  };
}

/**
 * Dispatched when loading the login fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOGIN_USER_ERROR passing the error
 */
export function userLoginError(error) {
  return {
    type: LOGIN_USER_ERROR,
    error,
  };
}
