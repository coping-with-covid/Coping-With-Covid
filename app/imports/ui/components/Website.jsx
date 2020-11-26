import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Website extends React.Component {
  render() {
    const website = this.props.website;
    return (
        <Card centered>
          <Card.Content>
            <Image
                floated='right'
                size='mini'
                src={website.image}
            />
            <Card.Header><a href={website.url} rel="noreferrer" target="_blank">{website.title}</a></Card.Header>
            <Card.Meta>Posted by {website.firstname} {website.lastname}</Card.Meta>
            <Card.Meta>{website.date.toLocaleDateString('en-US')}</Card.Meta>
            <Card.Description>
              {website.description}
            </Card.Description>
          </Card.Content>
          {Meteor.user().username === website.owner && <Card.Content extra>
            <Link to={`/editsite/${this.props.website._id}`}>Edit</Link>
          </Card.Content>}
        </Card>
    );
  }
}
/** Require a document to be passed to this component. */
Website.propTypes = {
  website: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Website);
