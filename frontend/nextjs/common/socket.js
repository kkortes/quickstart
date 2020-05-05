import io from 'socket.io-client';
import config from '../../../config';

const socket = io(config.endpoint.socket);

socket.request = (name, args) =>
  new Promise((resolve) => {
    const id = setTimeout(() => resolve(null), 1500);

    socket.emit(name, args, (r) => {
      clearTimeout(id);
      resolve(r);
    });
  });

export default socket;
