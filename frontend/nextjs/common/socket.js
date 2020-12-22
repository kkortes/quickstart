import io from 'socket.io-client';
import { setGlobal, getGlobal } from 'reactn';
import config from '../node_modules/@shared/config';
import { NETWORK_TIMEOUT } from '../node_modules/@shared/consts/NOTIFICATIONS';
import { REGISTER_TOKEN } from '../node_modules/@shared/consts/SOCKET_ACTIONS';

const socket = io(config.endpoint.socket);

socket.request = (name, args) =>
  new Promise((resolve) => {
    const id = setTimeout(() => resolve(NETWORK_TIMEOUT), 1500);

    socket.emit(name, args, (r) => {
      clearTimeout(id);
      resolve(r);
    });
  });

socket.on('connect', async () => {
  const { token } = getGlobal();
  if (token) {
    socket.emit(REGISTER_TOKEN, token);
  }

  setGlobal({ socket });
});

export default socket;
