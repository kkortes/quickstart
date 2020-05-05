import dotenv from 'dotenv';
dotenv.config();

import micro from 'micro';
import socketio from 'socket.io';
import websocketserver from './websocket-server.js';
import config from '../../config/index.js';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;

const server = micro(async (req, res) => {
  res.end(
    `<body><span style="color: green;">Accepting socket connections</span></body>`
  );
});

let mongo;

const client = new MongoClient(process.env.MONGOCONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, db) => {
  if (error) throw error;

  mongo = db;
  websocketserver(socketio(server), mongo);

  server.listen(3001, () =>
    console.log(
      `Server started with config: ${JSON.stringify(config, null, 2)}`
    )
  );
});
