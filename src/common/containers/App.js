import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {initEnvironment} from '../actions/actions';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {checkAuth} from '../actions/parseActions';
import {receiveAuth} from '../actions/parseActions';
import {signOut} from '../actions/parseActions';
import Parse from 'parse';
import ParseReact from 'parse-react';

class App extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(initEnvironment());
    dispatch(signOut());
<<<<<<< Updated upstream
    //dispatch(signOut());
=======
>>>>>>> Stashed changes
  }
  handleSignOut(){
    const { dispatch } = this.props;
    dispatch(signOut());
  }
  render() {
    const {isMobile, screenWidth, screenHeight} = this.props.environment;
      return (
        <div className='main-wrapper'>
          <header>
            <span className={checkAuth() ? 'avatar glyphicon glyphicon-user' : 'avatar glyphicon glyphicon-lock'}></span>
            {checkAuth() ?
              <nav>
                <span> Welcome {receiveAuth().user.username} !</span>
                <Button bsStyle="default" onClick={::this.handleSignOut}>Sign Out</Button>
              </nav>
               :
               <nav>
                 <Link to="/">
                   <Button bsStyle="default" >Home</Button>
                 </Link>
                 <Link to="/signin">
                   <Button bsStyle="default" >Sign In</Button>
                 </Link>
                 <Link to="/signup">
                   <Button bsStyle="default" >Sign Up</Button>
                 </Link>
               </nav>
            }
            <p>Group Chat Application with React & Parse</p>
          </header>
            <div className={isMobile ? 'mobile-chat' : 'desktop-chat'} style={{height: `${screenHeight-100}px`, width: `${screenWidth}px`}}>
              {this.props.children}
            </div>
          <footer></footer>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    environment: state.environment
  }
}

export default connect(mapStateToProps)(App)
