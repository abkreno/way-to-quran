import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
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
      <GoogleLogin
        clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
        cookiePolicy="single_host_origin"
      />
    );
  }
}
