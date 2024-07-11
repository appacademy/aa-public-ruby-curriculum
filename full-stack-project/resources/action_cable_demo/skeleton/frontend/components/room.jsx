import React from 'react';
import { connect } from 'react-redux';
import { receiveMessage, removeMessage } from '../redux/messages';
import { fetchRoom } from '../redux/rooms';
import { receiveUser } from '../redux/users';
import { createMessage, destroyMessage } from '../util/api_util';
import Message from './message';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      usersInRoom: {}
    };

    this.activeMessage = React.createRef();
    this.messageUl = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.enterRoom();
  }

  enterRoom() {
    const { fetchRoom, roomId } = this.props;

    fetchRoom(roomId).then(() => {
      if (this.activeMessage.current) {
        this.scrollToMessage();
      } else {
        this.scrollToBottom();
      }
    });

    // Your code here
  }

  componentDidUpdate({ 
    roomId: prevRoomId, 
    location: { hash: prevHash },
    messages: { length: prevNumMessages }
  }) {
    const { 
      roomId: curRoomId, 
      location: { hash: curHash },
      messages: { length: curNumMessages }
    } = this.props;

    if (prevRoomId !== curRoomId) {
      // Your code here
      this.enterRoom();
    } else if (this.activeMessage.current && prevHash !== curHash) {
      this.scrollToMessage();
    } else if (curNumMessages > prevNumMessages) {
      this.scrollToBottom();
    }
  }

  scrollToMessage() {
    this.activeMessage.current.focus();
    this.activeMessage.current.scrollIntoView();
  }

  scrollToBottom() {
    this.messageUl.current.scrollTop = this.messageUl.current.scrollHeight;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { roomId, currentUserId: authorId } = this.props;
    const { body } = this.state;

    createMessage({ body, roomId, authorId }).then(({ message, user }) => {
      this.props.receiveMessage(message);
      this.props.receiveUser(user);
      this.setState({ body: '' });
    });
  }

  handleDelete(messageId) {
    destroyMessage(messageId).then(() => {
      this.props.removeMessage(messageId);
    });
  }

  setReaction(id, reaction) {
    const { usersInRoom } = this.state;
    const newUser = { ...usersInRoom[id], reaction };
    this.setState({ usersInRoom: { ...usersInRoom, [id]: newUser } });
  }

  generateReactions(...reactions) {
    return reactions.map(reaction => (
      <span
        key={reaction}
        className='reaction'
        onClick={() => this.setReaction(this.props.currentUserId, reaction)}
      >
        {reaction}
      </ span>
    ));
  }

  render() {
    const { room, currentUserId, messages, location } = this.props;
    const activeMessageId = parseInt(location.hash.slice(1));
    const usersInRoom = Object.values(this.state.usersInRoom);

    return (
      <>
        <section className='room home-section'>
          <h1>{room?.name}</h1>

          <ul ref={this.messageUl}>
            {messages.map(message => (
              <li
                key={message.id}
                ref={activeMessageId === message.id && this.activeMessage}
                tabIndex={-1}
              >
                <Message {...message} />
                {message.authorId === currentUserId && (
                  <button
                    className='btn-delete'
                    onClick={() => this.handleDelete(message.id)}
                  >
                    x
                  </button>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <textarea
              rows={this.state.body.split('\n').length}
              onChange={e => this.setState({ body: e.target.value })}
              onKeyDown={e => {
                if (e.code === 'Enter' && !e.shiftKey) {
                  this.handleSubmit(e);
                }
              }}
              value={this.state.body}
            />
            <div className='message-controls'>
              <div>
                {this.generateReactions('👍', '❤️', '🔥', '😡')}
              </div>
              <button className='btn-primary' disabled={!this.state.body}>
                Send Message
              </button>
            </div>
          </form>
        </section>
        <section className='online-users home-section'>
          <h2>In Room</h2>
          <ul >
            {usersInRoom.map(({ id, username, reaction }) => (
              <li key={id} className={currentUserId === id ? 'current' : ''}>
                <span className='reaction'>{reaction}</span>
                <span>{username}</span>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  }
};

const mapState = (state, ownProps) => {
  const roomId = ownProps.match.params.id;
  const messages = Object.values(state.messages)
    .filter(message => message.roomId === parseInt(roomId))
    .map(message => ({
      ...message,
      author: state.users[message.authorId]?.username
    }))
    .sort(({ createdAt: timeA }, { createdAt: timeB }) => Math.sign(
      new Date(timeA).getTime() - new Date(timeB).getTime()
    ));

  return {
    currentUserId: state.currentUserId,
    messages,
    roomId,
    room: state.rooms[roomId]
  };
};

export default connect(mapState, {
  fetchRoom,
  receiveMessage,
  removeMessage,
  receiveUser
})(Room);