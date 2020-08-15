import React, { memo } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FormattedMessage } from 'react-intl';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Grid,
  Header,
  Form,
  Image,
  Segment,
} from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { images } from '../../images';
import { makeSelectIsLoadingUserData, makeSelectUserData } from './selectors';
import { loadUser } from './actions';

const key = 'user';

function LoginPage({ userData, onLoginSuccess, isLoadingUserData }) {
  const onSuccess = response => {
    localStorage.setItem('jwt', response.accessToken);
    onLoginSuccess();
  };

  const onFailure = response => {
    console.log(response);
  };

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  if (!isEmpty(userData)) {
    return <Redirect to="/" />;
  }
  return (
    <Grid
      textAlign="center"
      reversed="mobile vertically"
      style={{ height: 'calc(100vh - 61px)', marginLeft: 0, marginRight: 0 }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: '90%', width: 600 }}>
        <Segment>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={images.mushafLogo} />{' '}
            <FormattedMessage {...messages.header} />
          </Header>
          <Form size="large">
            <GoogleLogin
              className="login-button"
              clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  loading={renderProps.disabled || isLoadingUserData}
                  color="google plus"
                  fluid
                  size="large"
                >
                  <Icon name="google" />{' '}
                  <FormattedMessage {...messages.loginButtonText} />
                </Button>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

LoginPage.propTypes = {
  history: PropTypes.shape().isRequired,
  userData: PropTypes.shape().isRequired,
  isLoadingUserData: PropTypes.bool.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  isLoadingUserData: makeSelectIsLoadingUserData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoginSuccess: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUser());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(LoginPage);
