/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import withDirection, { withDirectionPropTypes } from 'react-with-direction';
import messages from './messages';

function HomePage({ direction }) {
  return (
    <h1 style={{ direction }}>
      <FormattedMessage {...messages.header} />
    </h1>
  );
}

HomePage.propTypes = {
  ...withDirectionPropTypes,
};

export default withDirection(HomePage);
