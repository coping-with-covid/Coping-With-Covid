import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {
  render() {
    const comment = this.props.comment;
    return (
        <Feed.Event >
          <Feed.Label>
            <img src={comment.image} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date content={comment.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              <Link to={`/profile/${comment.profileId}`}>{comment.firstname} {comment.lastname}:</Link> {comment.comment}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Comment);
