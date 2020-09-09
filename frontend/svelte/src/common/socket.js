import io from 'socket.io-client';
// import { setGlobal, getGlobal } from 'reactn';
import config from '../../config';
import { NETWORK_TIMEOUT } from '../../universal/NOTIFICATIONS';
import { REGISTER_TOKEN } from '../../universal/SOCKET_ACTIONS';

const socket = io(config.endpoint.socket);

export const request = (name, args) =>
  new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(NETWORK_TIMEOUT), 1500);

    socket.emit(name, args, (response) => {
      clearTimeout(id);
      if (response.hasOwnProperty('error')) {
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
