import React, { PropTypes } from 'react';

export default class MessageListItem extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };
  render() {
    const { message, user } = this.props;
    return (
      <li className={getMessageBubbleClass(user, message)} >
        <span>
          <b style={{color: '#66c'}}>{typeof message.userId !== 'undefined' ? message.userId : ''}</b>
          <i style={{color: '#aad', opacity: '0.8'}}>{message.time}</i>
        </span>
        <div style={{clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em'}} dangerouslySetInnerHTML={{__html: perseImageAndURL(message.text)}} />
      </li>
    );
  }
}

function getMessageBubbleClass(user, message) {
  if (typeof user !== 'undefined' && typeof message.userId !== 'undefined'
    && user.username == message.userId){
      return 'myMessage messageBubble';
    }
    return 'messageBubble';
}

var __urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
var __imgRegex = /\.(?:jpe?g|gif|png)$/i;
function perseImageAndURL(oMessage) {
  console.log(oMessage);
  var exp = __urlRegex;
  var pMessage = oMessage.replace(exp,function(match){__imgRegex.lastIndex=0;if(__imgRegex.test(match)){
    return '<img src="'+match+'" class="thumb" />';}else{
      return '<a href="'+match+'" target="_blank">'+match+'</a>';}}
  );
  return pMessage;
}
