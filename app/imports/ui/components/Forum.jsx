import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Posts } from '../../api/post/Posts';
import Comment from './Comment';
import AddComment from './AddComment';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

class Forum extends React.Component {
  render() {
    const post = this.props.post;
    return (
        <Card centered>
          <Card.Content>
            {this.props.location.pathname !== `/profile/${this.props.profile._id}` &&
            <Image
                floated='left'
                size='tiny'
                src={post.image}
            />}
            <Card.Header>{post.title}</Card.Header>
            {this.props.location.pathname !== `/profile/${this.props.profile._id}` &&
            <Card.Meta>Posted by <Link to={`/profile/${this.props.profile._id}`}>{post.firstname} {post.lastname}</Link></Card.Meta>}
            <Card.Meta>{post.date.toLocaleDateString('en-US')}</Card.Meta>
            <Card.Description>
              {post.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          {Meteor.user().username === post.owner &&
            <Link to={`/editpost/${this.props.post._id}`}>Edit</Link>
          }
          {(Meteor.user().username === post.owner || Roles.userIsInRole(Meteor.userId(), 'admin')) ? (
          <a className={'delete'} onClick={() => {
            Posts.collection.remove(this.props.post._id);
          }} >Delete</a>
          ) : ''}
          </Card.Content>
          {this.props.location.pathname !== `/profile/${this.props.profile._id}` && <Card.Content extra>
            <Feed>
              {this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
            </Feed>
          </Card.Content>}
          {this.props.location.pathname !== `/profile/${this.props.profile._id}` && <Card.Content extra>
            <AddComment profile={this.props.currentUser} elementId={this.props.post._id}/>
          </Card.Content>}
        </Card>
    );
  }
}
/** Require a document to be passed to this component. */
Forum.propTypes = {
  location: PropTypes.object,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  comments: PropTypes.array,
  currentUser: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Forum);
