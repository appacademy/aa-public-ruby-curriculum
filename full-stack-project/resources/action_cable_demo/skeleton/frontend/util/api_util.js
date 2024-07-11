import apiFetch from './custom_fetch';

// users

export const signup = user => (
  apiFetch('users', {
    method: 'POST',
    data: { user }
  })
);

export const login = user => (
  apiFetch('users/login', {
    method: 'POST',
    data: { user }
  })
);

export const logout = () => (
  apiFetch('users/logout', {
    method: 'DELETE'
  })
);

// rooms

export const fetchRooms = () => apiFetch('rooms');

export const fetchRoom = id => apiFetch(`rooms/${id}`);

export const createRoom = room => (
  apiFetch('rooms', {
    method: 'POST',
    data: { room }
  })
);

export const destroyRoom = id => (
  apiFetch(`rooms/${id}`, {
    method: 'DELETE'
  })
);

// messages

export const createMessage = message => (
  apiFetch('messages', {
    method: 'POST',
    data: { message }
  })
);

export const destroyMessage = id => (
  apiFetch(`messages/${id}`, {
    method: 'DELETE'
  })
);

// mentions

export const fetchMentions = () => apiFetch('mentions');

export const readMention = id => (
  apiFetch(`mentions/${id}/read`, {
    method: 'PATCH'
  })
);