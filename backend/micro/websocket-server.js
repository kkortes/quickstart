import {
  LOGIN_ACCOUNT,
  CREATE_ACCOUNT,
} from '../../universal/SOCKET_ACTIONS.js';
import loginAccount from './actions/loginAccount.js';
import createAccount from './actions/createAccount.js';

export default (io, mongo) =>
  io.on('connection', (socket) => {
    socket.action = (name, func) =>
      socket.on(name, async (body, fn) => {
        const result = await func(body, mongo);
        return await fn(result);
      });

    socket.action(LOGIN_ACCOUNT, loginAccount);
    socket.action(CREATE_ACCOUNT, createAccount);
  });
