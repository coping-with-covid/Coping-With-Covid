import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Feed, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import swal from 'sweetalert';
import Comment from './Comment';
import AddComment from './AddComment';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Forum extends React.Component {

  removePost(ID) {
    console.log(`${ID}`);
    this.props.posts.collection.remove(ID);
    swal('Success', 'Post have been deleted', 'success');
  }

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
          {Meteor.user().username === post.owner && <Card.Content extra>
            <Link to={`/editpost/${this.props.post._id}`}>Edit</Link>
          </Card.Content>}
          {this.props.location.pathname !== `/profile/${this.props.profile._id}` && <Card.Content extra>
            <Feed>
              {this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
            </Feed>
          </Card.Content>}
          {this.props.location.pathname !== `/profile/${this.props.profile._id}` && <Card.Content extra>
            <AddComment profile={this.props.currentUser} elementId={this.props.post._id}/>
          </Card.Content>}
          <Card.Content extra>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Button icon onClick={() => this.removePost(this.props.post._id)}><Icon name='trash'/></Button>
            ) : ''}
          </Card.Content>
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
  posts: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Forum);
