var http = require('http');

var options = {
  host: 'localhost',
  port: 5984,
  path: '/xxx',  // or with query string '/index.html?page=12'
  method: 'DELETE'
};

var request = http.request(options, function(res) {
  console.log('status:', res.statusCode);
  console.log('headers:', res.headers);
  if (res.statusCode == 200) {
    console.log('database successfully deleted');
  } else {
    console.log('could not delete database');
  };
});

request
  .on('error', function(e) {
    console.log('problem with request:', e.message);
  })
  .end();

request
  .on('response', function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('body:', chunk);
    });
  });
