/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR } from './constants';

export const initialState = {
  isLoadingUserData: false,
  userData: {},
  loadUserError: {},
};

/* eslint-disable default-case, no-param-reassign */
const userProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USER:
        draft.isLoadingUserData = true;
        break;
      case LOAD_USER_SUCCESS:
        draft.isLoadingUserData = false;
        draft.userData = action.userData;
        break;
      case LOAD_USER_ERROR:
        draft.isLoadingUserData = false;
        draft.loadUserError = action.loadUserError;
        break;
    }
  });

export default userProviderReducer;
