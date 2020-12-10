import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Topic extends React.Component {
  render() {
    const questionStyle = { marginTop: '15px', marginBottom: '15px' };
    const topic = this.props.topic;
    return (
        <div style={questionStyle} className="ui center aligned container">
          <Header size="huge">Topic of the Day: {topic.topic}</Header>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Topic.propTypes = {
  topic: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Topic);
