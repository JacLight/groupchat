import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Input, Button } from 'react-bootstrap';
import * as parseActions from '../actions/parseActions';
import { Link } from 'react-router';

class SignUp extends Component {

  static propTypes = {
    defaultApp: PropTypes.string.isRequired,
    userValidation: PropTypes.array.isrequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.defaultApp || '',
      email: this.props.defaultApp || '',
      password: '',
      confirmPassword: ''
    };
  }
  componentWillMount() {
    const { dispatch, userValidation } = this.props;
    if(userValidation.length === 0) {
      dispatch(actions.usernameValidationList());
    }
  }
  componentDidMount() {
    if (this.state.email.length) {
      this.refs.passwordInput.getInputDOMNode().focus();
    } else {
      this.refs.emailInput.getInputDOMNode().focus();
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    if (!this.state.email.length) {
      this.refs.emailInput.getInputDOMNode().focus();
    }
    if (this.state.email.length && !this.state.password.length) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }
    if (this.state.username.length && this.state.password.length && !this.state.confirmPassword.length) {
      this.refs.confirmPasswordInput.getInputDOMNode().focus();
    }
    if (this.state.email.length && this.state.password.length && this.state.confirmPassword.length) {
      const userObj = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      dispatch(parseActions.signUp(userObj))
      this.setState({ username: '', email: '', password: '', confirmPassword: ''});
    }
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'email') {
      this.setState({ email: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
    if (event.target.name === 'confirm-password') {
      this.setState({ confirmPassword: event.target.value });
    }
  }
  validateUsername() {
    const { userValidation } = this.props;
    if (userValidation.filter(user => {
      return user === this.state.username.trim();
    }).length > 0) {
      return 'error';
    }
    return 'success';
  }
  validateEmail() {
    if (validateEmail(this.state.email.trim())){
      const { userValidation } = this.props;
      if (userValidation.filter(user => {
        return user === this.state.email.trim();
      }).length > 0) {
        return 'error';
      }
      return 'success';
    }else{
      return 'error';
    }
  }
  validateConfirmPassword() {
    if (this.state.confirmPassword.length > 0 && this.state.password.length > 0) {
      if (this.state.password === this.state.confirmPassword) {
        return 'success';
      }
      return 'error';
    }
  }
  render() {
    return (
      <div>
        <header className='componentTitle'>Sign Up</header>
        <main className='containerCentered'>
          <form  onSubmit={::this.handleSubmit} >
            <section style={{height: '6em'}}>
              <Input
                label="Email"
                ref="emailInput"
                type="email"
                help={this.validateEmail() === 'error' && 'Invalid Email! or Email already exsits!'}
                bsStyle={this.validateEmail()}
                hasFeedback
                name="email"
                autoFocus="true"
                placeholder="Enter a valid email address"
                value={this.state.email}
                onChange={::this.handleChange}
              />
            </section>

            <section style={{height: '6em'}}>
              <Input
                label="Username"
                ref="usernameInput"
                type="text"
                help={this.validateUsername() === 'error' && 'A user with that name already exists!'}
                bsStyle={this.validateUsername()}
                hasFeedback
                name="username"
                autoFocus="true"
                placeholder="Enter username"
                value={this.state.username}
                onChange={::this.handleChange}
              />
            </section>

            <section style={{height: '6em'}}>
              <Input
                label="Password"
                ref="passwordInput"
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Enter password"
                onChange={::this.handleChange}
              />
            </section>
            <section style={{height: '6em'}}>
              <Input
                label="Confirm Password"
                ref="confirmPasswordInput"
                help={this.validateConfirmPassword() === 'error' && 'Your password doesn\'t match'}
                type="password"
                name="confirm-password"
                placeholder="Enter password again" value={this.state.confirmPassword}
                onChange={::this.handleChange}
              />
            </section>
            <Button
              disabled={this.validateEmail() === 'error' || this.validateUsername() === 'error' || this.validateConfirmPassword() === 'error' && true}
              bsStyle="success"
              className='bigButton'
              onClick={::this.handleSubmit}
              type="submit">
              Sign Up
            </Button>
          </form>
          <div className='buttonSep'></div>
          <div className='buttonCentered'>
            <Link to="/signin">
              <Button className='bigButton' bsStyle="default" >Sign In</Button>
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
      userValidation: state.userValidation.data
  }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export default connect(mapStateToProps)(SignUp)
