import io from 'socket.io-client';
import { setGlobal } from 'reactn';
import config from '../../../config';

const socket = io(config.endpoint.socket);

socket.request = (name, args) =>
  new Promise((resolve) => {
    const id = setTimeout(
      () => resolve({ error: 'Connection to server timed out' }),
      1500
    );

    socket.emit(name, args, (r) => {
      clearTimeout(id);
      resolve(r);
    });
  });

socket.on('connect', () => setGlobal({ socket }));

export default socket;
