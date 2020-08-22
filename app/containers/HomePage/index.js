/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Segment, Form, Button, Container, Icon } from 'semantic-ui-react';
import withDirection, { withDirectionPropTypes } from 'react-with-direction';
import messages from './messages';

const durationOptions = [
  { key: '10', value: '10', text: '10 Minutes' },
  { key: '15', value: '15', text: '15 Minutes' },
  { key: '30', value: '30', text: '30 Minutes' },
  { key: '45', value: '45', text: '45 Minutes' },
  { key: '60', value: '60', text: '1 Hour' },
];

function HomePage() {
  return (
    <>
      <Container text textAlign="center">
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Segment inverted>
          <h3>
            <FormattedMessage {...messages.formHeader} />
          </h3>
          <Form inverted>
            <Form.Group widths="equal">
              <Form.Select
                style={{ direction: 'ltr' }}
                fluid
                label={<FormattedMessage {...messages.durationLabel} />}
                placeholder={durationOptions[0].text}
                options={durationOptions}
              />
            </Form.Group>
            <Button color="green" fluid type="submit">
              <Icon style={{ margin: '0 10px' }} name="clock" />
              <FormattedMessage {...messages.submitButtonText} />
            </Button>
          </Form>
        </Segment>
      </Container>
    </>
  );
}

HomePage.propTypes = {
  ...withDirectionPropTypes,
};

export default withDirection(HomePage);
