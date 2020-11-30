import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Image, Button, Grid, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
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
        <Container>
          <div className="profile-background">
            <Image className="profile-image" src={profile.image} circular centered size="small"/>
          </div>
          <Header size="huge" textAlign="center">
            {profile.firstname} {profile.lastname}
            <Header.Subheader>{profile.owner}</Header.Subheader>
          </Header>
          <Container textAlign="center" className="profile-desc">
            <p>{profile.description}</p>
            {currentUser === profile.owner && <Button as={NavLink} exact to={`/editprofile/${profile._id}`} color="grey">Update Info</Button>}
          </Container>
          <Grid columns={3} stackable>
            <Grid.Row>
              <Grid.Column verticalAlign="bottom">
                <Header size="medium">All Posts</Header>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Input icon="search" placeholder="Search posts..."/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfilePage.propTypes = {
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const docId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  return {
    profile: Profiles.collection.findOne(docId),
    ready: subscription.ready(),
  };
})(ProfilePage);
