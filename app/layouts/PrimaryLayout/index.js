import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { images } from '../../images';
import messages from './messages';

const withPrimaryLayout = Component => () => (
  <div>
    <Menu fixed="top" inverted>
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

    <Component />
  </div>
);

export default withPrimaryLayout;
