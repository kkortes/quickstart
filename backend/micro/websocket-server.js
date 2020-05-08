import {
  LOGIN_ACCOUNT,
  CREATE_ACCOUNT,
  STORE_STATE,
  REGISTER_TOKEN,
} from '../../universal/SOCKET_ACTIONS.js';
import loginAccount from './actions/loginAccount.js';
import createAccount from './actions/createAccount.js';
import storeState from './actions/storeState.js';
import registerToken from './actions/registerToken.js';

let users = [];

export default (io, mongo) => {
  io.on('connection', (socket) => {
    socket.action = (name, func) =>
      socket.on(name, async (body, fn) => {
        const result = await func(body, mongo);
        return await fn(result);
      });

    users.push({
      id: socket.id,
      token: '',
    });

    socket.action(LOGIN_ACCOUNT, async (name, func) => {
      const result = await loginAccount(name, func);

      if (result.token) {
        registerToken(io, socket, users, result.token);
      }
      return result;
    });

    socket.action(CREATE_ACCOUNT, createAccount);
    socket.action(STORE_STATE, storeState);

    socket.on(REGISTER_TOKEN, (token) =>
      registerToken(io, socket, users, token)
    );

    socket.on('disconnect', () => {
      const userIndex = users.findIndex(({ id }) => id === socket.id);
      if (userIndex !== 0) {
        users.splice(userIndex, 1);
      }
    });
  });

  // setInterval(() => {
  //   console.table(users);
  // }, 1000);
};
