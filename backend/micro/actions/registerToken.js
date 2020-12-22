import { LOGGED_IN_ELSWEHRE } from '@shared/consts/SOCKET_ACTIONS.js';

export default (io, socket, sessions, token) => {
  if (token) {
    const dupeToken = sessions.findIndex(
      (session) => session.token === token && session.id !== socket.id
    );

    if (dupeToken !== -1) {
      io.to(sessions[dupeToken].id).emit(LOGGED_IN_ELSWEHRE);
      sessions[dupeToken].token = '';
    }
  }
  const dupeID = sessions.findIndex((session) => session.id === socket.id);
  if (dupeID !== -1) {
    sessions[dupeID].token = token;
  }
};
