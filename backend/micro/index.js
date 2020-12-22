import dotenv from 'dotenv';
dotenv.config();

import micro from 'micro';
import socketio from 'socket.io';
import mongodb from 'mongodb';
import config from '@shared/config/index.js';
import websocketserver from './websocket-server.js';

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

  server.listen(3003, () =>
    console.log(
      `Server started with config: ${JSON.stringify(config, null, 2)}`
    )
  );
});
