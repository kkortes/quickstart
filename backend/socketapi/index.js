import helloWorld from '../../universal/helloWorld.js';

const server = require('micro')();
const io = require('socket.io')(server);

console.log(helloWorld);
require('./websocket-server.js')(io);

server.listen(3002, () => console.log(`Server started at port 3002`));
