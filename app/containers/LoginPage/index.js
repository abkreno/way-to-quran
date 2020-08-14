import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FormattedMessage } from 'react-intl';
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
// import PropTypes from 'prop-types';

export default class LoginPage extends Component {
  static propTypes = {};

  componentDidMount() {}

  onSuccess = response => {
    console.log(response);
  };

  onFailure = response => {
    console.log(response);
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: '40vw' }}>
          <Segment>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={mushafLogo} />{' '}
              <FormattedMessage {...messages.header} />
            </Header>
            <Form size="large">
              <GoogleLogin
                className="login-button"
                clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
                buttonText="Login"
                render={() => (
                  <Button color="google plus" fluid size="large">
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
