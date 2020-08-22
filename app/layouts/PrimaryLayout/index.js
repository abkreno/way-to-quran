import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Menu, Dropdown } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import withDirection, {
  withDirectionPropTypes,
  DIRECTIONS,
} from 'react-with-direction';

import reducer from 'containers/LoginPage/reducer';
import saga from 'containers/LoginPage/saga';
import { loadUser, userLoaded } from 'containers/LoginPage/actions';
import { makeSelectUserData } from 'containers/LoginPage/selectors';

import { images } from '../../images';
import messages from './messages';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

const key = 'user';

function PrimaryLayout({
  children,
  loadUserData,
  userData,
  logout,
  direction,
  history,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const isLoggedIn = localStorage.getItem('access_token') && !isEmpty(userData);

  useEffect(() => {
    if (localStorage.getItem('access_token') && isEmpty(userData)) {
      loadUserData();
    }
  });

  return (
    <div>
      <Menu inverted>
        <Container>
          <Menu.Item as="a" header>
            <Image
              size="mini"
              src={images.mushafLogo}
              style={{ marginRight: '1.5em' }}
            />
            <FormattedMessage {...messages.header} />
          </Menu.Item>
          {isLoggedIn && (
            <Menu.Menu
              position={direction === DIRECTIONS.LTR ? 'right' : 'left'}
            >
              <Dropdown
                item
                simple
                icon={<Image src={userData.picture} avatar />}
              >
                <Dropdown.Menu>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      history.push('/daily-quran');
                    }}
                  >
                    <FormattedMessage {...messages.dailyQuranText} />
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      history.push('/');
                      logout();
                    }}
                    icon="sign-out"
                    text={<FormattedMessage {...messages.logoutButtonText} />}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          )}
          {isLoggedIn && <Menu.Item name={userData.name} as="span" header />}
        </Container>
      </Menu>
      <Container>{React.Children.only(children)}</Container>
    </div>
  );
}

PrimaryLayout.propTypes = {
  children: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  userData: PropTypes.shape().isRequired,
  loadUserData: PropTypes.func.isRequired,
  ...withDirectionPropTypes,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});

const mapDispatchToProps = dispatch => ({
  loadUserData: () => {
    dispatch(loadUser());
  },
  logout: () => {
    localStorage.removeItem('access_token');
    dispatch(userLoaded({}));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const ComposedPrimaryLayout = compose(
  withConnect,
  withRouter,
  withDirection,
  memo,
)(PrimaryLayout);

const withPrimaryLayout = Component => () => (
  <ComposedPrimaryLayout>
    <Component />
  </ComposedPrimaryLayout>
);
export default withPrimaryLayout;
