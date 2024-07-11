import * as API from '../util/api_util';
import { receiveMessages } from './messages';
import { receiveUsers } from './users';

export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const REMOVE_ROOM = 'REMOVE_ROOM';

const receiveRoom = (room) => {
  return {
    type: RECEIVE_ROOM,
    room
  };
};

export const fetchRooms = () => dispatch => {
  return API.fetchRooms().then(({ rooms, users }) => {
    dispatch({
      type: RECEIVE_ROOMS,
      rooms
    });
    dispatch(receiveUsers(users));
  });
};

export const fetchRoom = id => dispatch => {
  return API.fetchRoom(id).then(({ room, messages, users }) => {
    dispatch(receiveMessages(messages));
    dispatch(receiveRoom(room));
    dispatch(receiveUsers(users));
  });
};

export const createRoom = name => dispatch => {
  return API.createRoom(name).then(room => dispatch(receiveRoom(room)));
};

export const destroyRoom = roomId => dispatch => {
  return API.destroyRoom(roomId).then(
    () => dispatch({
      type: REMOVE_ROOM,
      roomId
    })
  );
};

export const roomsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ROOM:
      const { room } = action;
      return { ...state, [room.id]: room };
    case RECEIVE_ROOMS:
      return { ...state, ...action.rooms };
    case REMOVE_ROOM:
      const newState = { ...state };
      delete newState[action.roomId];
      return newState;
    default:
      return state;
  }
};