import { injectIntl } from 'react-intl';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormattedNumber extends Component {
  static propTypes = {
    intl: PropTypes.any,
    value: PropTypes.any,
  };

  componentDidMount() {}

  render() {
    const { intl, value } = this.props;
    const usedLocale = intl.locale;
    let formattedNum = intl.formatNumber(value);

    // need to test for "ar" and "ar-*" seperately, as "ar" will also match "arn"
    // check to see if the locale is "ar" OR starts with "ar-" AND that a comma is present
    if (
      (usedLocale === 'ar' || usedLocale.indexOf('ar-') === 0) &&
      formattedNum.indexOf('٬') !== -1
    ) {
      formattedNum = formattedNum.replace(/٬/g, ',');
    }
    return <span>{formattedNum}</span>;
  }
}

export default injectIntl(FormattedNumber);
