import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Loader } from 'semantic-ui-react';
import { Profiles } from '../../api/profile/Profiles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { height: '50px', border: '0px', margin: '0px' };
    return (
        <div>
          <Menu style={menuStyle} widths={5} key='menuBar' attached="top" borderless>
            <Menu.Item/>
            <Menu.Item/>
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header className="ui huge header title">COPING WITH COVID</Header>
            </Menu.Item>
            <Menu.Item/>
            <Menu.Item position="right">
              {this.props.currentUser === '' ? (
                  <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                      <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                      <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                    </Dropdown.Menu>
                  </Dropdown>
              ) : (
                  <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                      <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                    </Dropdown.Menu>
                  </Dropdown>
              )}
            </Menu.Item>
          </Menu>
          {this.props.currentUser ? (
              <Menu style={menuStyle} widths={12} size='huge' attached='top' borderless>
                <Menu.Item as={NavLink} exact to="/home">Home</Menu.Item>
                <Menu.Item as={NavLink} exact to="/forum">Forum</Menu.Item>
                <Menu.Item id="websites" as={NavLink} exact to="/websites">Websites</Menu.Item>
                <Menu.Item as={NavLink} exact to="/about">FAQs</Menu.Item>
                <Menu.Item id="profile" as={NavLink} exact to={`/profile/${this.props.profile._id}`}>Profile</Menu.Item>
              </Menu>
          ) : ''}
        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  profile: PropTypes.object,
  ready: PropTypes.bool,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => {
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const ready = subscription.ready();
  const profile = Profiles.collection.findOne({ owner: currentUser });
  return {
    currentUser,
    ready,
    profile,
  };
})(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
