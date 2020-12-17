import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Image, Button, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { Websites } from '../../api/website/Websites';
import { Posts } from '../../api/post/Posts';
import Website from '../components/Website';
import Forum from '../components/Forum';

/** Renders a page containing one Profile document. */
class ProfilePage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const profile = this.props.profile;
    const currentUser = Meteor.user().username;
    return (
        <Container id="profile-page">
          <div className="profile-background">
            <Image className="profile-image" src={profile.image} circular centered size="small"/>
          </div>
          <Header size="huge" textAlign="center">
            {profile.firstname} {profile.lastname}
            <Header.Subheader id="profile-current-user">{profile.owner}</Header.Subheader>
          </Header>
          <Container textAlign="center" className="profile-desc">
            <p>{profile.description}</p>
            {currentUser === profile.owner && <Button id='edit-profile' as={NavLink} exact to={`/editprofile/${profile._id}`} color="grey">Update Info</Button>}
          </Container>
          <Header size="medium">Forum Posts</Header>
          <Card.Group itemsPerRow={1}>
            {this.props.posts.map((post, index) => <Forum
                key={index}
                post={post}
                profile={this.props.profile}
                currentUser={this.props.profile}
            />)}
          </Card.Group>
          <Header size="medium">Website Posts</Header>
          <Card.Group itemsPerRow={1}>
            {this.props.websites.map((website, index) => <Website
                key={index}
                website={website}
                profile={this.props.profile}
                currentUser={this.props.profile}
            />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an object of Profile documents in the props. */
ProfilePage.propTypes = {
  profile: PropTypes.object,
  websites: PropTypes.array,
  posts: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const docId = match.params._id;
  // Get access to Profile documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(Websites.userPublicationName);
  const subscription3 = Meteor.subscribe(Posts.userPublicationName);
  const profile = Profiles.collection.findOne(docId);
  return {
    profile: profile,
    websites: Websites.collection.find({ owner: profile.owner }).fetch(),
    posts: Posts.collection.find({ owner: profile.owner }).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ProfilePage);
