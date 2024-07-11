import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { createRoom, destroyRoom, fetchRooms } from '../redux/rooms';

class RoomsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.props.fetchRooms();
  }

  createRoom(e) {
    e.preventDefault();
    const { createRoom, currentUserId: ownerId } = this.props;
    createRoom({ ownerId, name: this.state.name });
    this.setState({ name: '' });
  }

  render() {
    const { rooms, currentUserId, destroyRoom } = this.props;

    return (
      <section className='rooms-index home-section'>
        <h1>Rooms</h1>
        <ul>
          {rooms.map(({ id, name, ownerId }) => (
            <li key={id}>
              <NavLink to={currentUserId ? `/rooms/${id}` : '/login'}>
                {name}
              </NavLink>
              {ownerId === currentUserId && (
                <button
                  className='btn-delete'
                  onClick={() => destroyRoom(id)}
                >
                  x
                </button>
              )}
            </li>
          ))}
        </ul>
        {!!currentUserId &&
          <form onSubmit={this.createRoom}>
            <input
              type="text"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <button className='btn-primary' disabled={!this.state.name}>
              Create Room
            </button>
          </form>
        }
      </section >
    );
  }
}

const mapState = state => {
  return {
    currentUserId: state.currentUserId,
    rooms: Object.values(state.rooms)
  };
};


export default connect(mapState, {
  createRoom,
  destroyRoom,
  fetchRooms
})(RoomsIndex);