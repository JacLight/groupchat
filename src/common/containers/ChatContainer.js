import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
import {receiveAuth} from '../actions/parseActions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const socket = io('', { path: '/api/chat' });

class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch, user } = this.props;
    if(!user.username) {
      dispatch(receiveAuth());
    }
    dispatch(actions.fetchMessages());
  }
  render() {
    return (
      <Chat {...this.props} socket={socket} />
    );
  }
}
ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  typers: PropTypes.array.isRequired,
  screenHeight: PropTypes.number.isRequired,
  screenWidth: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
      messages: state.messages.data,
      user: state.auth.user,
      typers: state.typers,
      screenHeight: state.environment.screenHeight,
      screenWidth: state.environment.screenWidth
  }
}
export default connect(mapStateToProps)(ChatContainer)
