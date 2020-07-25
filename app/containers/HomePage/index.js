/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import FormattedNumber from '../../components/FormattedNumber';

export default function HomePage() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
      <FormattedNumber value={10000} />
    </h1>
  );
}
