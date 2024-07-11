import * as API from '../util/api_util';
import { receiveMessages } from './messages';
import { receiveUsers } from './users';

export const RECEIVE_MENTION = 'RECEIVE_MENTION';
export const RECEIVE_MENTIONS = 'RECEIVE_MENTIONS';
export const REMOVE_MENTION = 'REMOVE_MENTION';
export const READ_MENTION = 'READ_MENTION';

export const receiveMention = mention => {
  return {
    type: RECEIVE_MENTION,
    mention
  };
};

export const removeMention = mentionId => {
  return {
    type: REMOVE_MENTION,
    mentionId
  };
};

export const fetchMentions = () => dispatch => {
  return API.fetchMentions().then(({ mentions, messages, users }) => {
    dispatch({
      type: RECEIVE_MENTIONS,
      mentions
    });
    dispatch(receiveMessages(messages));
    dispatch(receiveUsers(users));
  });
};

export const readMention = id => dispatch => {
  return API.readMention(id).then(
    () => dispatch({
      type: READ_MENTION,
      mentionId: id
    })
  );
};

export const mentionsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MENTION: {
      const { mention } = action;
      return { ...state, [mention.id]: mention };
    }
    case READ_MENTION: {
      const mention = state[action.mentionId];
      return { ...state, [mention.id]: { ...mention, read: true } };
    }
    case RECEIVE_MENTIONS:
      return { ...state, ...action.mentions };
    case REMOVE_MENTION:
      const newState = { ...state };
      delete newState[action.mentionId];
      return newState;
    default:
      return state;
  }
};