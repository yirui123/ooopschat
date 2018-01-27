//import module
// the variable is a function call
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT);
app.use(express.static('public'));
//console.log("socket is running")

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);
  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    //io.sockets.emit('mouse', data);
    console.log(data);
  }
}