import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Websites } from '../../api/website/Websites';
import { Profiles } from '../../api/profile/Profiles';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  title: String,
  url: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddWebsite extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  /** On submit, insert the data. */
  submit(data) {
    const { title, url, description } = data;
    const owner = Meteor.user().username;
    const image = this.props.profile.image;
    const firstname = this.props.profile.firstname;
    const lastname = this.props.profile.lastname;
    const date = new Date();
    Websites.collection.insert({ title, url, description, owner, image, firstname, lastname, date },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            this.setState({ redirectToReferer: true });
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/websites' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Contact</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
              <Segment>
                <TextField name='title'/>
                <TextField name='url'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AddWebsite.propTypes = {
  location: PropTypes.object,
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const username = Meteor.user().username;
  return {
    profile: Profiles.collection.findOne({ owner: username }),
    ready: subscription.ready(),
  };
})(AddWebsite);
