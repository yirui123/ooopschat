//import module
// the variable is a function call
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var server = app.listen(PORT);
app.use(express.static('public'));
//console.log("socket is running")

var socket = require('socket.io');

var io = socket(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);
  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    //io.sockets.emit('mouse', data);
    //console.log(data);
  }

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    // io.emit('chat message', loc);
  });

}