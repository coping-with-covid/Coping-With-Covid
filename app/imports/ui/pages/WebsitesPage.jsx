import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Image, Button, Menu, Card, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Website from '../components/Website';
import { Websites } from '../../api/website/Websites';
import { Profiles } from '../../api/profile/Profiles';
import { Comments } from '../../api/comment/Comments';

/** Renders a page containing all of the Website documents. Use <Website> to render each row. */
class WebsitesPage extends React.Component {

  state = {
    search: '',
  }

  onchange = e => {
    this.setState({ search: e.target.value });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderSites(website, index) {
    return (
        <Website
            key={index}
            website={website}
            profile={this.props.profiles.find(profile => (profile.owner === website.owner))}
            comments={this.props.comments.filter(comment => (comment.elementId === website._id))}
            currentUser={this.props.profiles.find(profile => (profile.owner) === Meteor.user().username)}
        />
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { search } = this.state;
    const filteredSites = this.props.websites.filter(site => (site.description.toLowerCase().indexOf(search.toLowerCase()) !== -1 || site.title.toLowerCase().indexOf(search.toLowerCase()) !== -1));
    return (
        <Container id="websites-page">
          <Image fluid centered src="images/websites-background.jpg"/>
          <Menu borderless className="website-menu" widths={3}>
            <Menu.Item>
            </Menu.Item>
            <Menu.Item>
              <Input icon="search" placeholder="Search posts by keywords..." onChange={this.onchange}/>
            </Menu.Item>
            <Menu.Item>
              <Button id='website-create' as={NavLink} exact to={'/addsite'} className="website-button">Create New Post</Button>
            </Menu.Item>
          </Menu>
          <Card.Group itemsPerRow={3}>
            {filteredSites.map((website, index) => this.renderSites(website, index))}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Website documents in the props. */
WebsitesPage.propTypes = {
  websites: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Website, Profile, Comment documents.
  const subscription = Meteor.subscribe(Websites.userPublicationName);
  const subscription2 = Meteor.subscribe(Profiles.userPublicationName);
  const subscription3 = Meteor.subscribe(Comments.userPublicationName);
  return {
    websites: Websites.collection.find({}).fetch(),
    profiles: Profiles.collection.find({}).fetch(),
    comments: Comments.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(WebsitesPage);
