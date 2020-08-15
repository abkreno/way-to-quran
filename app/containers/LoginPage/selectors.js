import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */
const selectUser = state => state.user || initialState;

/**
 * Select the user loading flag
 */

const makeSelectIsLoadingUserData = () =>
  createSelector(
    selectUser,
    userState => userState.isLoadingUserData,
  );

/**
 * Select the user jwt
 */

const makeSelectJWT = () =>
  createSelector(
    selectUser,
    userState => userState.jwt,
  );

/**
 * Select the user data
 */
const makeSelectUserData = () =>
  createSelector(
    selectUser,
    userState => userState.userData,
  );

export {
  selectUser,
  makeSelectIsLoadingUserData,
  makeSelectUserData,
  makeSelectJWT,
};
