import { LOGGED_IN_ELSWEHRE } from '../../../universal/SOCKET_ACTIONS.js';

export default (io, socket, users, token) => {
  if (token) {
    const dupeToken = users.findIndex((user) => user.token === token);

    if (dupeToken !== -1) {
      io.to(users[dupeToken].id).emit(LOGGED_IN_ELSWEHRE);
      users[dupeToken].token = '';
    }
  }
  const dupeID = users.findIndex((user) => user.id === socket.id);
  if (dupeID !== -1) {
    users[dupeID].token = token;
  }
};
