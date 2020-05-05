import { LOGIN, CREATE_ACCOUNT } from '../../universal/SOCKET_ACTIONS.js';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default (io) => {
  io.on('connection', (socket) => {
    socket
      .on(LOGIN, async (data, fn) => {
        fn(data);
      })
      .on(CREATE_ACCOUNT, async (data, fn) => {
        fn(data);
      })
      .on('disconnect', () => {});
  });
};
