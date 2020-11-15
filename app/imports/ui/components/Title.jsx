import React from 'react';
import { Header } from 'semantic-ui-react';

class Title extends React.Component {
  render() {
    const titleStyle = { marginTop: '15px',  marginBottom: '15px'};
    return (
        <div style={titleStyle} className="ui center aligned container">
          <Header size='huge'>COPING WITH COVID</Header>
        </div>
    );
  }
}

export default Title;
