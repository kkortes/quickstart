import micro from 'micro';
import socketio from 'socket.io';
import websocketserver from './websocket-server.js';
import config from '../../config/index.js';

const server = micro(async (req, res) => {
  res.end(
    `<body><span style="color: green;">Accepting socket connections</span></body>`
  );
});

websocketserver(socketio(server));

server.listen(3001, () =>
  console.log(`Server started with config: ${JSON.stringify(config, null, 2)}`)
);
