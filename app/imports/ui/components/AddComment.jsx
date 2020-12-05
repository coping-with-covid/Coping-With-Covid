import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Comments } from '../../api/comment/Comments';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  comment: String,
  elementId: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddComment extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { comment, elementId, createdAt } = data;
    const profile = this.props.profile;
    const firstname = profile.firstname;
    const lastname = profile.lastname;
    const image = profile.image;
    const profileId = profile._id;
    Comments.collection.insert({ comment, elementId, createdAt, firstname, lastname, image, profileId },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Note added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => {
          fRef = ref;
        }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
          <Segment>
            <TextField label="Add a comment" name='comment'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='elementId' value={this.props.elementId}/>
            <HiddenField name='createdAt' value={new Date()}/>
          </Segment>
        </AutoForm>
    );
  }
}

AddComment.propTypes = {
  profile: PropTypes.object.isRequired,
  elementId: PropTypes.string.isRequired,
};

export default AddComment;
