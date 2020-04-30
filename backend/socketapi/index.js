const micro = require('micro');
const fs = require('fs');
const path = require('path');

const document = path.join(__dirname, 'index.html');
const html = fs.readFileSync(document);
const server = micro(async (req, res) => res.end(html));

const io = require('socket.io')(server);
const config = require('../../api/config.js').default;

require('./websocket-server.js')(io);

server.listen(3002, () =>
  console.log(`Server started at ${config.endpoint.socket}`)
);
