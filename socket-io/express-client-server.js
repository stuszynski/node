var express = require('express')
, io = require('socket.io');

var app = express.createServer()
, io = io.listen(app);

app.set('view engine', 'ejs');

app.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('other server event', function (data) {
    console.log('   data received from client:', data);
  });
});

app.get('/', function(req, res) {

  res.render('index', {
    locals: {
      'title': 'socket.io demo',
    }
  });

});
