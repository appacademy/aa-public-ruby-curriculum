import * as API from '../util/api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_CURRENT_USER_ID = 'RECEIVE_CURRENT_USER_ID';

export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

// helper function for signup and login thunk action creators
const startSession = (user, dispatch) => {
  dispatch({ type: RECEIVE_CURRENT_USER_ID, id: user.id });
  return dispatch(receiveUser(user));
};

export const signup = userData => dispatch => {
  return API.signup(userData).then(
    user => startSession(user, dispatch)
  );
};

export const login = userData => dispatch => {
  return API.login(userData).then(
    user => startSession(user, dispatch)
  );
};

export const logout = () => (dispatch, getState) => {
  return API.logout().then(() => {
    return dispatch({
      type: REMOVE_CURRENT_USER,
      id: getState().currentUserId
    });
  });
};

export const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      const { user } = action;
      return { ...state, [user.id]: user };
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case REMOVE_CURRENT_USER:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export const currentUserIdReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER_ID:
      return action.id;
    case REMOVE_CURRENT_USER:
      return null;
    default:
      return state;
  }
};