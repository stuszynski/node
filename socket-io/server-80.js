var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/socket-io.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('error loading index-10.html');
    };
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log('message from server:', data);
  });
  socket.on('disconnect', function () {
    console.log('disconnected');
  });
});
