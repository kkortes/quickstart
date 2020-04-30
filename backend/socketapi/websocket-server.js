const config = require('../../api/config.js').default;
const { validLoginKey } = require('../../api/auth.js');
const claimLand = require('./events/claimLand.js').default;
const banUser = require('./events/banUser.js').default;
const message = require('./events/message.js').default;
const fetchLeaderBoard = require('./events/fetchLeaderBoard.js').default;
const withdraw = require('./events/withdraw.js').default;
const joinRoom = require('./events/joinRoom.js').default;
const disconnect = require('./events/disconnect.js').default;
const dungeonGroups = require('./events/dungeonGroups.js').default;
const createGroup = require('./events/createGroup.js').default;
const joinGroup = require('./events/joinGroup.js').default;
const leaveGroup = require('./events/leaveGroup.js').default;
const enterDungeon = require('./events/enterDungeon.js').default;
const checkInDungeon = require('./events/checkInDungeon.js').default;
const stageCleared = require('./events/stageCleared.js').default;

// In-memory DB
let connections = [];
let bans = [];

module.exports = (io, mongo) => {
  io.on('connection', (socket) => {
    // Chat and user interactions
    socket.on('BAN_USER', (data) => {
      bans = banUser(data, io, connections, bans);
    });
    socket.on('MESSAGE', (data) => message(data, mongo, socket, bans));

    // Stats and fetches'
    socket.on('FETCH_LEADERBOARD', () => fetchLeaderBoard(connections, socket));

    // Claim and conquest
    socket.on('WITHDRAW', (data) => withdraw(data, mongo, socket));
    socket.on('CLAIM_LAND', (data) => claimLand(data, mongo));

    // Duels
    socket.on('REQUEST_DUEL', (data) =>
      socket.to(data.toSocketID).emit('REQUEST_DUEL', data)
    );
    socket.on('ACCEPT_DUEL', (data) =>
      socket.to(data.toSocketID).emit('RUN_DUEL', data)
    );

    // Dungeons
    socket.on('DUNGEON_GROUPS', (data) => dungeonGroups(data, mongo, io));
    socket.on('CREATE_GROUP', (data) => createGroup(data, mongo, socket, io));
    socket.on('JOIN_GROUP', (data) => joinGroup(data, mongo, socket, io));
    socket.on('LEAVE_GROUP', (data) => leaveGroup(data, mongo, socket, io));
    socket.on('ENTER_DUNGEON', (data) => enterDungeon(data, mongo, io));
    socket.on('CHECK_IN_DUNGEON', (data) =>
      checkInDungeon(data, mongo, socket)
    );
    socket.on('STAGE_CLEARED', (data) => stageCleared(data, mongo, io));

    // Global
    socket.on('LEAVE_ROOM', socket.leave);
    socket.on('JOIN_ROOM', (data) => {
      connections = joinRoom(data, socket, connections, io);
    });

    // Makes socket.userId available to all the receivers, making them
    // able to verify the authenticity of a message.
    socket.on('SET_CURRENT_USER', async ({ token, sessionLoginKey }) => {
      const hasCorrectKey = await validLoginKey(mongo, sessionLoginKey, token);

      if (hasCorrectKey) {
        socket.userId = token;
      }
    });

    socket.on('disconnect', () => {
      connections = disconnect(socket, connections, io);
    });
  });

  setInterval(
    async () => {
      const collection = mongo.db('worldseed').collection('conquests');
      const conquests = await collection.find({}).toArray();
      io.to('CONQUEST').emit('REWARDS', conquests);
    },
    config.env === 'development' ? 600000 : 600000
  );

  setInterval(async () => {
    const collection = mongo.db('worldseed').collection('conquests');
    const conquests = await collection.find({}).toArray();
    io.to('CONQUEST').emit('CONQUEST', conquests);
  }, 5000);

  setInterval(() => {
    const { rooms } = io.sockets.adapter;
    // console.table(rooms);

    Object.keys(rooms).forEach((roomKey) => {
      const { sockets } = rooms[roomKey];

      if (roomKey.slice(0, 3) !== 'WSR') return;

      if (config.debug) {
        console.table(
          connections.map(
            ({
              name,
              socketID,
              race,
              activity,
              location: { id: locationID, x, y },
            }) => ({
              name,
              socketID,
              race,
              activity,
              locationID,
              x,
              y,
            })
          )
        );
      }

      io.to(roomKey).emit('HEART_BEAT', {
        connections: Object.keys(sockets)
          .map((socketKey) =>
            connections.find(({ socketID }) => socketID === socketKey)
          )
          .filter((notUndefined) => notUndefined),
      });
    });
  }, 2500);
};
