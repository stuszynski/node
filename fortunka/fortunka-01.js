
var express = require('express');

var app = express.createServer();

app.listen(8000);

var fortunes = [];

app.get('/', function(req, res) {
  res.send("Welcome to Node Fortune\n");
});

// curl -F "fortune=hej" http://localhost:8000/send
// curl -F "fortune=hej,hej" http://localhost:8000/send
// curl http://localhost:8000/fortunes

app.post('/send', express.bodyParser(), function(req, res) {
  if (req.body && req.body.fortune) {
    fortunes.push(req.body.fortune);
    res.send({status: "ok", message: "Fortune received"});
  } else {
    res.send({status: "nok", message: "No fortune received"})
  }
});

app.get('/fortunes', function(req, res) {
  res.send(fortunes);
});
