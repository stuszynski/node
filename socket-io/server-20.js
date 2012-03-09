// Express + Socket.IO

var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index-10.html');  // ten sam plik co w server-10.js
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('other server event', function (data) {
    console.log(data);
  });
});
