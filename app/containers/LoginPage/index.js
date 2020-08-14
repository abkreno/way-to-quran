import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
      <LoginContainer>
        <GoogleLogin
          className="login-button"
          clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy="single_host_origin"
        />
      </LoginContainer>
    );
  }
}
