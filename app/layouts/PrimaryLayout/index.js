import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Menu } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import reducer from 'containers/LoginPage/reducer';
import saga from 'containers/LoginPage/saga';

import { images } from '../../images';
import messages from './messages';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { loadUser } from '../../containers/LoginPage/actions';

const key = 'user';

function PrimaryLayout({ children, loadUserData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
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
          {/* <Menu.Item as="a">Home</Menu.Item> */}

          {/* <Dropdown item simple text="Dropdown">
        <Dropdown.Menu>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Header Item</Dropdown.Header>
          <Dropdown.Item>
            <i className="dropdown icon" />
            <span className="text">Submenu</span>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
        </Container>
      </Menu>
      <Container>{React.Children.only(children)}</Container>
    </div>
  );
}

PrimaryLayout.propTypes = {
  children: PropTypes.shape().isRequired,
  loadUserData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  loadUserData: () => {
    dispatch(loadUser());
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const ComposedPrimaryLayout = compose(
  withConnect,
  memo,
)(PrimaryLayout);

const withPrimaryLayout = Component => () => (
  <ComposedPrimaryLayout>
    <Component />
  </ComposedPrimaryLayout>
);
export default withPrimaryLayout;
