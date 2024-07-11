import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { messagesReducer } from './messages';
import { roomsReducer } from './rooms';
import { usersReducer, currentUserIdReducer } from './users';
import { mentionsReducer } from './mentions';

const configureStore = () => {
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = {
      users: {
        [currentUser.id]: currentUser
      },
      currentUserId: currentUser.id
    };
  }

  const logger = createLogger({
    collapsed: (_, __, logEntry) => !logEntry.error,
  });

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  );
};

const rootReducer = combineReducers({
  users: usersReducer,
  messages: messagesReducer,
  rooms: roomsReducer,
  mentions: mentionsReducer,
  currentUserId: currentUserIdReducer
});

export default configureStore;
