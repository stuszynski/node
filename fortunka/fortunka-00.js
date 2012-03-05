// A basic Web server with Express

var express = require('express');

var app = express.createServer();

app.get('/', function(req, res) {
  res.send('Welcome to Node Fortune\n')
});

app.listen(8000);
