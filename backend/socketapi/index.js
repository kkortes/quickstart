import helloWorld from '../../universal/helloWorld.js';
import micro from 'micro';
import socketio from 'socket.io';
import websocketserver from './websocket-server.js';

const server = micro();
const io = socketio(server);

websocketserver(io);

server.listen(3001, () => console.log(`Server started at port 3001`));

console.log(helloWorld());
