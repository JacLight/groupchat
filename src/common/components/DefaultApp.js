import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {defaultApp} from '../actions/actions';
import { connect } from 'react-redux';
import { Input, Button } from 'react-bootstrap';
import SignIn from './SignIn';

class DefaultApp extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      email: ''
    };
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
  }
  handleSubmit() {
    const { dispatch } = this.props;
    const username = this.state.username;
    dispatch(defaultApp(username));
    this.setState({ username: '' });
  }
  render() {
    const {screenWidth} = this.props;
    return (
      <div>
        <main className='containerCentered'>

          <div className='buttonCentered'>
            <Link to="/signin">
              <Button className='bigButton' bsStyle="default" >Sign in</Button>
            </Link>
            <div className='buttonSep'></div>
            <Link to="/signup">
              <Button  className='bigButton'>Sign Up</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      screenWidth: state.environment.screenWidth
  }
}

export default connect(mapStateToProps)(DefaultApp)
