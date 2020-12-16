import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Image, Button, Menu, Dropdown, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import Forum from '../components/Forum';
import Topic from '../components/Topic';
import { Posts } from '../../api/post/Posts';
import { Profiles } from '../../api/profile/Profiles';
import { Comments } from '../../api/comment/Comments';
import { Topics } from '../../api/topic/Topic';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ForumPage extends React.Component {

  state = {
    sortType: 'latest',
  }

  onSort = sortType => {
    this.setState({ sortType });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPosts(post, index) {
    return (
        <Forum
            key={index}
            post={post}
            profile={this.props.profiles.find(profile => (profile.owner === post.owner))}
            comments={this.props.comments.filter(comment => (comment.elementId === post._id))}
            currentUser={this.props.profiles.find(profile => (profile.owner) === Meteor.user().username)}
        />
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const sortOptions = [
      {
        key: 'Latest',
        text: 'Latest',
        value: 'Latest',
      },
      {
        key: 'Oldest',
        text: 'Oldest',
        value: 'Oldest',
      },
    ];

    const { sortType } = this.state;

    const sortedPosts = this.props.posts.sort((a, b) => {
      const isRev = (sortType === 'latest') ? -1 : 1;
      return isRev * (a.date.toLocaleDateString('en-US').localeCompare(b.date.toLocaleDateString('en-US')));
    });
    return (
        <Container id="forum-page">
          <Image fluid centered src="images/forum-background.png"/>
          <Menu borderless className="website-menu">
            <Menu.Item>
              Sort by: {' '}
              <Dropdown
                  inline
                  options={sortOptions}
                  defaultValue={sortOptions[0].value}
                  onChange={() => this.onSort((sortType === 'latest') ? 'oldest' : 'latest')}
              />
            </Menu.Item>
            <Menu.Item position="right">
              <Button as={NavLink} exact to={'/addpost'} className="website-button">Create New Post</Button>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Button as={NavLink} exact to={`/edittopic/${this.props.topics[0]._id}`} className="website-button">Edit Topic</Button>
              ) : ''}
            </Menu.Item>
          </Menu>
          <Topic topic={this.props.topics[0]}/>
          <Card.Group itemsPerRow={3}>
            {sortedPosts.map((post, index) => this.renderPosts(post, index))}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ForumPage.propTypes = {
  posts: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Posts.userPublicationName);
  const subscription2 = Meteor.subscribe(Profiles.userPublicationName);
  const subscription3 = Meteor.subscribe(Comments.userPublicationName);
  const subscription4 = Meteor.subscribe(Topics.userPublicationName);
  return {
    posts: Posts.collection.find({}).fetch(),
    profiles: Profiles.collection.find({}).fetch(),
    comments: Comments.collection.find({}).fetch(),
    topics: Topics.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(ForumPage);
