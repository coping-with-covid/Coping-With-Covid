import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Header id="signout-page" as="h2" textAlign="center">
        <p>You are signed out.</p>
        <p><Link to="/">Return to the Homepage</Link></p>
      </Header>
    );
  }
}
