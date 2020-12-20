import {
  LOGIN_ACCOUNT,
  CREATE_ACCOUNT,
  STORE_STATE,
  REGISTER_TOKEN,
  USERNAME_AVAILABILITY,
} from './universal/SOCKET_ACTIONS.js';
import loginAccount from './actions/loginAccount.js';
import createAccount from './actions/createAccount.js';
import storeState from './actions/storeState.js';
import registerToken from './actions/registerToken.js';
import usernameAvailability from './actions/usernameAvailability.js';

let sessions = [];

export default (io, mongo) => {
  io.on('connection', (socket) => {
    socket.action = (name, func) =>
      socket.on(name, async (body, fn) => {
        const result = await func(body, mongo);
        return await fn(result);
      });

    sessions.push({
      id: socket.id,
      token: '',
    });

    socket.action(LOGIN_ACCOUNT, async (name, mongo) => {
      const result = await loginAccount(name, mongo);

      if (result.token) {
        registerToken(io, socket, sessions, result.token);
      }
      return result;
    });

    socket.action(CREATE_ACCOUNT, createAccount);
    socket.action(STORE_STATE, storeState);
    socket.action(USERNAME_AVAILABILITY, usernameAvailability);

    socket.on(REGISTER_TOKEN, (token) =>
      registerToken(io, socket, sessions, token)
    );

    socket.on('disconnect', () => {
      const sessionIndex = sessions.findIndex(({ id }) => id === socket.id);
      if (sessionIndex !== 0) {
        sessions.splice(sessionIndex, 1);
      }
    });
  });

  // setInterval(() => {
  //   console.table(sessions);
  // }, 1000);
};
