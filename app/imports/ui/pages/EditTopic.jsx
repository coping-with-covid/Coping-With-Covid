import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Roles } from 'meteor/alanning:roles';
import { Topics } from '../../api/topic/Topic';

const bridge = new SimpleSchema2Bridge(Topics.schema);

/** Renders the Page for editing a single document. */
class EditTopic extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { topic, _id } = data;
    Topics.collection.update(_id, { $set: { topic } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    this.setState({ redirectToReferer: true });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/forum' } };
    // redirect if incorrect authentication
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      this.setState({ redirectToReferer: true });
    }
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header className="ui large header sign" textAlign="center">Edit Topic</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='topic'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Website document in the props object. Uniforms adds 'model' to the props, which we use. */
EditTopic.propTypes = {
  location: PropTypes.object,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Website documents.
  const subscription = Meteor.subscribe(Topics.userPublicationName);
  return {
    doc: Topics.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditTopic);
