/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import ReactDirectionProvider, {
  DIRECTIONS,
} from 'react-with-direction/dist/DirectionProvider';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

export function DirectionProvider(props) {
  const direction = props.locale.includes('ar')
    ? DIRECTIONS.RTL
    : DIRECTIONS.LTR;
  return (
    <ReactDirectionProvider direction={direction}>
      {React.Children.only(props.children)}
    </ReactDirectionProvider>
  );
}

DirectionProvider.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectionProvider);
