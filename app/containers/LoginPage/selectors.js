import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */
const selectLogin = state => state.login || initialState;

/**
 * Select the login locale
 */

const makeSelectIsLoggingIn = () =>
  createSelector(
    selectLogin,
    loginState => loginState.isLoggingIn,
  );

export { selectLogin, makeSelectIsLoggingIn };
