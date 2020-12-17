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
class Website extends React.Component {

  removeWebsite(ID) {
    console.log(`${ID}`);
    this.props.websites.collection.remove(ID);
    swal('Success', 'Post have been deleted', 'success');
  }

  render() {
    const website = this.props.website;
    return (
        <Card centered>
          <Card.Content>
            {this.props.location.pathname !== `/profile/${this.props.profile._id}` &&
            <Image
                floated='left'
                size='tiny'
                src={website.image}
            />}
            <Card.Header><a href={website.url} rel="noreferrer" target="_blank">{website.title}</a></Card.Header>
            {this.props.location.pathname !== `/profile/${this.props.profile._id}` &&
            <Card.Meta>Posted by <Link to={`/profile/${this.props.profile._id}`}>{website.firstname} {website.lastname}</Link></Card.Meta>}
            <Card.Meta>{website.date.toLocaleDateString('en-US')}</Card.Meta>
            <Card.Description>
              {website.description}
            </Card.Description>
          </Card.Content>
          {Meteor.user().username === website.owner && <Card.Content extra>
            <Link to={`/editsite/${this.props.website._id}`}>Edit</Link>
          </Card.Content>}
          {this.props.location.pathname !== `/profile/${this.props.profile._id}` && <Card.Content extra>
            <Feed>
              {this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
            </Feed>
          </Card.Content>}
          {this.props.location.pathname !== `/profile/${this.props.profile._id}` && <Card.Content extra>
            <AddComment profile={this.props.currentUser} elementId={this.props.website._id}/>
          </Card.Content>}
          <Card.Content extra>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Button icon onClick={() => this.removeWebsite(this.props.website._id)}><Icon name='trash'/></Button>
            ) : ''}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Website.propTypes = {
  location: PropTypes.object,
  website: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  comments: PropTypes.array,
  currentUser: PropTypes.object,
  websites: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Website);
