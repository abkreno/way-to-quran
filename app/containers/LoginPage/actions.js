/*
 *
 * LoginPage actions
 *
 */

import { SET_LOGGING_IN } from './constants';

export function setLoggingIn(isLoggingIn) {
  return {
    type: SET_LOGGING_IN,
    isLoggingIn,
  };
}
