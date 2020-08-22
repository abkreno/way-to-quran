/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
  },
  formHeader: {
    id: `${scope}.formHeader`,
  },
  durationLabel: {
    id: `${scope}.durationLabel`,
  },
  durationPlaceHolder: {
    id: `${scope}.durationPlaceHolder`,
  },
  submitButtonText: {
    id: `${scope}.submitButtonText`,
  },
});
