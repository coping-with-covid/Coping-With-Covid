import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profiles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstname: '', lastname: '', email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstname, lastname, email, password } = this.state;
    if (firstname === '') {
      this.setState({ error: 'Please enter your first name.' });
    } else
      if (lastname === '') {
        this.setState({ error: 'Please enter your last name.' });
      } else {
        Accounts.createUser({ email, username: email, password }, (err) => {
          if (err) {
            this.setState({ error: err.reason });
          } else {
            Profiles.collection.insert({ firstname, lastname, owner: email },
                (err2) => {
                  if (err2) {
                    this.setState({ error: err2.reason }); // may need to fix
                  } else {
                    this.setState({ error: '', redirectToReferer: true });
                  }
                });
            this.setState({ error: '', redirectToReferer: true });
          }
        });
      }
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const titleStyle = { marginTop: '15px', marginBottom: '30px' };
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div>
          <div style={titleStyle}>
            <Header textAlign="centered" size='huge' color="brown">
              Register your account
            </Header>
          </div>
          <div className="landing-background">
            <Container id="signup-page">
              <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
                <Grid.Column>
                  <Form onSubmit={this.submit}>
                    <Segment stacked>
                      <Form.Group widths='equal'>
                        <Form.Input
                            label="First Name"
                            id="signup-form-firstname"
                            name="firstname"
                            type="firstname"
                            placeholder="First Name"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            label="Last Name"
                            id="signup-form-lastname"
                            name="lastname"
                            type="lastname"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Input
                          label="Email"
                          id="signup-form-email"
                          icon="user"
                          iconPosition="left"
                          name="email"
                          type="email"
                          placeholder="E-mail address"
                          onChange={this.handleChange}
                      />
                      <Form.Input
                          label="Password"
                          id="signup-form-password"
                          icon="lock"
                          iconPosition="left"
                          name="password"
                          placeholder="Password"
                          type="password"
                          onChange={this.handleChange}
                      />
                      <Form.Button id="signup-form-submit" content="Submit" color="brown" circular/>
                    </Segment>
                  </Form>
                  <Message color="brown">
                    Already have an account? Login <Link to="/signin">here</Link>
                  </Message>
                  {this.state.error === '' ? (
                      ''
                  ) : (
                      <Message
                          error
                          header="Registration was not successful"
                          content={this.state.error}
                      />
                  )}
                </Grid.Column>
              </Grid>
            </Container>
          </div>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
