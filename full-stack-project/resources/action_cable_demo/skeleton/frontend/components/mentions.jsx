import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { fetchMentions, readMention, receiveMention } from '../redux/mentions';
import { receiveMessage } from '../redux/messages';
import { receiveUser } from '../redux/users';
import Message from './message';
import Dropdown from './dropdown';

class Mentions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasUnseen: false
    };
  }

  componentDidMount() {
    this.props.fetchMentions();

    // Your code here
  }


  render() {
    const { hasUnseen } = this.state;
    const { mentions, numUnread, readMention } = this.props;

    return (
      <Dropdown
        className={'mentions' + (hasUnseen ? ' unseen' : '')}
        render={({ toggleOpen, isOpen }) => (
          <>
            {numUnread > 0 && (
              <span className='unread-counter'>
                {numUnread}
              </span>
            )}

            <FontAwesomeIcon
              icon={faBell}
              className={'mentions__button' + (hasUnseen ? ' unseen' : '')}
              onClick={() => {
                this.setState({ hasUnseen: false });
                toggleOpen();
              }}
            />

            <ul className='dropdown' hidden={!isOpen}>
              {mentions.length === 0 && <span>No unread mentions</span>}
              {mentions.map(({ id, read, message, room }) => (
                <Link
                  key={id}
                  to={{
                    pathname: `/rooms/${room.id}`,
                    hash: `#${message.id}`
                  }}
                  onClick={() => !read && readMention(id)}
                >
                  <li className={read ? 'read' : ''}>
                    <Message {...message} />
                    <div className='mention-right'>
                      <span>{room.name}</span>
                      {!read && (
                        <button
                          className='btn-primary'
                          onClick={e => e.preventDefault()}
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </li>
                </Link>
              ))
              }
            </ul>
          </>
        )}
      />
    );
  }
}

const mapState = state => {
  let numUnread = 0;
  const mentions = Object.values(state.mentions)
    .filter(mention => (
      mention.userId === state.currentUserId
      && state.messages[mention.messageId]
    ))
    .map(mention => {
      if (!mention.read) numUnread++;

      const message = state.messages[mention.messageId];
      const author = state.users[message.authorId]?.username;
      const room = state.rooms[message.roomId] || {};
      return {
        ...mention,
        room,
        message: { ...message, author }
      };
    })
    .sort((a, b) => {
      if (a.read !== b.read) {
        return a.read ? 1 : -1;
      } else {
        const [timeA, timeB] = [a, b].map(
          ({ message }) => new Date(message?.createdAt).getTime()
        );
        return Math.sign(timeB - timeA);
      }
    });

  return {
    mentions,
    numUnread
  };
};

export default connect(mapState, {
  readMention,
  receiveMessage,
  receiveMention,
  receiveUser,
  fetchMentions
})(Mentions);