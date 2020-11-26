import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Image, Button, Menu, Dropdown, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Website from '../components/Website';
import { Websites } from '../../api/website/Websites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const sortOptions = [
      {
        key: 'Recent',
        text: 'Recent',
        value: 'Recent',
      },
      {
        key: 'Rating',
        text: 'Rating',
        value: 'Rating',
      },
    ];
    return (
        <Container>
          <Image fluid centered src="images/websites-background.jpg"/>
          <Menu borderless className="website-menu">
            <Menu.Item>
              Sort by: {' '}
              <Dropdown
                  inline
                  options={sortOptions}
                  defaultValue={sortOptions[0].value}
              />
            </Menu.Item>
            <Menu.Item position="right">
              <Button as={NavLink} exact to={'/addsite'} className="website-button">Create New Post</Button>
            </Menu.Item>
          </Menu>
          <Card.Group>
            {this.props.websites.map((website, index) => <Website key={index} website={website}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStuff.propTypes = {
  websites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Websites.userPublicationName);
  return {
    websites: Websites.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStuff);
