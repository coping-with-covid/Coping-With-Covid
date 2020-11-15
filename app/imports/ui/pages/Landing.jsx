import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const titleStyle = { marginTop: '15px', marginBottom: '15px' };
    const introStyle = { marginTop: '15px', marginBottom: '15px' };
    return (
        <div>
          <div style={titleStyle} className="ui center aligned container">
            <Header size='huge'>COPING WITH COVID</Header>
          </div>
          <div className="landing-background"/>
          <div style={introStyle} className="ui center aligned container">
            <Header size='huge'>WELCOME TO COPING WITH COVID</Header>
            <Header as='h3'>
              Student mental health in higher education has been an increasing concern.
               The COVID-19 pandemic has negatively affected everybody, causing a lot of pressure, uneasiness, despondency,
              and inner issues for the understudies alongside their companions and their family.
               We propose to create a mental health page that can give students ease and comfort.
               Making therapy and relief accessible to all. It will be a safe space where people can openly express themselves without fear of judgment.
            </Header>

            <Button className='ui large button hollow' circular as={NavLink} exact to="/signin">Log in</Button>
            <Button className='ui large button solid' circular as={NavLink} exact to="/signup">Register</Button>
          </div>
        </div>
    );
  }
}

export default Landing;
