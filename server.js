var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3000;

app.get('/chat', function(req, res){
  res.send('Routed properly');
});

io.on('connection', function(socket){
  console.log('User connected');

  socket.on('disconnect', function(){
  console.log('User disconnected');
  });

  socket.on('new message', function(msg){
  console.log(msg.user + ': ' + msg.message);
  io.emit('new message', msg);
  });

  socket.on('new user', function(msg){
  console.log(msg + ' has just joined');
  io.emit('new user', msg);
  });
});

app.listen(port, function() {
    console.log('The server has been initiated at ' + port );
});
