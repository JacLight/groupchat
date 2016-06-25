import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-bootstrap';
import * as parseActions from '../actions/parseActions';
import { Link } from 'react-router';


class SignIn extends Component {

  static propTypes = {
    defaultApp: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: this.props.defaultApp || '',
      password: ''
    };
  }
  componentDidMount() {
    if (this.state.email.length) {
      this.refs.passwordInput.getInputDOMNode().focus();
    } else {
      this.refs.emailInput.getInputDOMNode().focus();
    }
  }
  handleChange(event) {
    if (event.target.name === 'email') {
      this.setState({ email: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    if (this.state.email.length < 1) {
      this.refs.emailInput.getInputDOMNode().focus();
    }
    if (this.state.email.length > 0 && this.state.password.length < 1) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      var userObj = {
        email: this.state.email,
        password: this.state.password
      };
      dispatch(parseActions.signIn(userObj))
      this.setState({ email: this.state.email, password: ''});
    }
  }
  render() {
    return (
      <div>
        <header className='componentTitle'>Sign In to Chat</header>
        <main className='containerCentered'>
          <form onSubmit={::this.handleSubmit}>
            <Input
              label="Email"
              ref="emailInput"
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={::this.handleChange}
            />
            <Input
              label="Password"
              ref="passwordInput"
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={::this.handleChange}
            />
            <Button
              bsStyle="success"
              className='bigButton' name="submitButton"
              type="submit" >
              Sign In
            </Button>
          </form>
          <div className='buttonSep'></div>
          <div className='buttonCentered'>
            <Link to="/signup">
              <Button className='bigButton' bsStyle="default">Sign Up</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      defaultApp: state.defaultApp,
  }
}
export default connect(mapStateToProps)(SignIn)
