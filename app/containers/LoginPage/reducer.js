/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import { SET_LOGGING_IN } from './constants';

export const initialState = {
  isLoggingIn: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOGGING_IN:
        draft.isLoggingIn = action.isLoggingIn;
        break;
    }
  });

export default loginProviderReducer;
