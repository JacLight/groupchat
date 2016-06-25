import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import * as actions from '../actions/actions';
import * as parseActions from '../actions/parseActions';
import TypingListItem from './TypingListItem';
import { Modal, DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    typers: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired,
    screenHeight: PropTypes.number.isRequired,
    screenWidth: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      targetedUser: '',
    }

    if (!parseActions.checkAuth()){
      const { dispatch } = this.props;
      dispatch(signOut());
    }
  }
  componentDidMount() {
    const { socket, user, dispatch } = this.props;

    socket.emit('chat mounted', user);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    );
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    );
    socket.on('receive socket', socketID =>
      dispatch(parseActions.receiveSocket(socketID))
    );
  }
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    if (typeof messageList !== 'undefined') messageList.scrollTop = messageList.scrollHeight;
  }
  handleResize() {
  }
  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }
  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(parseActions.signOut());
  }
  render() {
    const { messages, socket, typers, dispatch, user, screenHeight, screenWidth} = this.props;
    const filteredMessages = messages;
    const username = this.props.user.email;
    const dropDownMenu = (
      <div>
        <b>{username}</b>
      </div>
    );
    return (
      <div>
      <header className='componentTitle'>Group Chat</header>
      <div className="chatMain">
        <ul className="messageBubbleList" style={{height: '600px'}} ref="messageList">
          {messages.map(message =>
            <MessageListItem
              user={user}
              message={message}
              key={message.id}
            />
          )}
        </ul>
        <MessageComposer socket={socket} user={user} onSave={::this.handleSave} />
        <footer className="chatFooter">
          {typers.length === 1 &&
            <div>
              <span>
                <TypingListItem username={typers[0]} key={1}/>
                <span> is typing</span>
              </span>
            </div>}
          {typers.length === 2 &&
          <div>
            <span>
              <TypingListItem username={typers[0]} key={1}/>
              <span> and </span>
              <TypingListItem username={typers[1]} key={2}/>
              <span> are typing</span>
            </span>
          </div>}
          {typers.length > 2 &&
          <div>
            <span>Several people are typing</span>
          </div>}
        </footer>
      </div>
      </div>
    );
  }
}
