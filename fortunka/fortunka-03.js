// -- application

var express = require('express'),
  app = express.createServer();

app.set('view engine', 'ejs');

// app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.listen(8000);


// -- variables

var fortunes = [];


// -- helper function

function acceptsHtml(header) {
  var accepts = header.split(',')

  for(i = 0; i < accepts.length; i += 0) {
    if (accepts[i] === 'text/html') {
      return true;
    };
  };

  return false;
};


// -- routing

app.get('/', function(req, res) {
  var title = 'Fortunka',
    header = 'Welcome to Fortune';

  res.render('index', {
    locals: {
      'title': title,
      'header': header,
      'fortunes': fortunes,
      'stylesheets': ['application.css']
    }
  });
});

app.post('/send', express.bodyParser(), function(req, res) {
  if (req.body && req.body.fortune) {
    fortunes.push(req.body.fortune);

    if (acceptsHtml(req.headers['accept'])) {
      res.redirect('/', 302);
    } else {
      res.send({status: "ok", message: "Fortune received"});
    };

  } else {
    res.send({status: "nok", message: "No fortune received"})
  }
});


// odpowiedź application/json; można usunąć

app.get('/fortunes', function(req, res) {
  res.send(fortunes);
});
