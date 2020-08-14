import React, { Component } from 'react';
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
import messages from './messages';
import mushafLogo from '../../images/mushaf.png';

class LoginPage extends Component {
  static propTypes = {};

  componentDidMount() {}

  onSuccess = response => {
    localStorage.setItem('jwt', response.accessToken);
    this.props.history.push('/');
  };

  onFailure = response => {
    console.log(response);
  };

  render() {
    if (localStorage.getItem('jwt')) {
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
              <Image src={mushafLogo} />{' '}
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
                    loading={renderProps.disabled}
                    color="google plus"
                    fluid
                    size="large"
                  >
                    <Icon name="google" />{' '}
                    <FormattedMessage {...messages.loginButtonText} />
                  </Button>
                )}
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                cookiePolicy="single_host_origin"
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(LoginPage);
