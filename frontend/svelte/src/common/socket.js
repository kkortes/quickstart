import io from 'socket.io-client';
// import { setGlobal, getGlobal } from 'reactn';
import config from '@shared/config';
import { NETWORK_TIMEOUT } from '@shared/consts/NOTIFICATIONS';
import { REGISTER_TOKEN } from '@shared/consts/SOCKET_ACTIONS';

const socket = io(config.endpoint.socket);

export const request = (name, args) =>
  new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(NETWORK_TIMEOUT), 1500);

    socket.emit(name, args, (response) => {
      clearTimeout(id);
      if (response.hasOwnProperty('type') && response.type === 'error') {
        reject(response);
      } else {
        resolve(response);
      }
    });
  });

socket.on('connect', async () => {
  // const { token } = getGlobal();
  // if (token) {
  //   socket.emit(REGISTER_TOKEN, token);
  // }
  // setGlobal({ socket });
});

export default socket;
