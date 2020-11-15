import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const introStyle = { marginTop: '15px', marginBottom: '15px' };
    return (
        <div>
          <div className="digits-landing-background"/>
          <div style={introStyle} className="ui center aligned container">
            <Header size='huge'>WELCOME TO COPING WITH COVID</Header>
            <p className="intro">
              Student mental health in higher education has been an increasing concern.
               The COVID-19 pandemic has negatively affected everybody, causing a lot of pressure, uneasiness, despondency,
              and inner issues for the understudies alongside their companions and their family.
               We propose to create a mental health page that can give students ease and comfort.
               Making therapy and relief accessible to all. It will be a safe space where people can openly express themselves without fear of judgment.
            </p>

            <Button circular size='large' as={NavLink} exact to="/signup">Log in</Button>
            <Button circular size='large' as={NavLink} exact to="/signin">Register</Button>
          </div>
        </div>
    );
  }
}

export default Landing;
