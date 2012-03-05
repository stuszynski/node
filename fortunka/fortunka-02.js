
var express = require('express');

var app = express.createServer();

app.set('view engine', 'ejs');

app.listen(8000);

var fortunes = [];

app.get('/', function(req, res) {
  var title = 'Fortunka',
    header = 'Welcome to Fortune';

  res.render('index', {
    locals: {
      'title': title,
      'header': header,
      'fortunes': fortunes,
      'stylesheets': ['/public/application.css']
    }
  });
});

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
