import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    const usStyle = { marginTop: '15px', marginBottom: '15px' };

    return (
          <Grid id="about-page" style={usStyle} container centered stackable columns={3}>
            <Grid.Column>
              <Header className="ui medium header us" textAlign="center">Learn about us</Header>
              <p className="intro">
                Coping with Covid was created to lend a helping hand to those in need.
                We’re here to provide a safe space for students in a time of need.
                Coping with Covid is a social platform where students can share how they feel with generated questions
                and respond to others</p>
              <p className="intro">
                Students here are welcomed to ask questions or vent your emotions with people who know what’s it’s like
                to experience difficulties and everything that goes alongside them.</p>
              <p className="intro">
                Coping with Covid will have the tools to help you cope with the crisis you’re going through. We’re ready
                to help you, all you have to do is reach out and join us.
              </p>
            </Grid.Column>
            <Grid.Column>
              <img className="ui fluid image"
                   src="https://images.unsplash.com/photo-1599351329996-7a151ed565c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"/>
            </Grid.Column>
          </Grid>
    );
  }
}

export default About;
