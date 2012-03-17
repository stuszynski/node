var http = require('http');

var options = {
  host: 'localhost',
  port: 5984,
  path: '/_all_dbs',  // or with query string '/index.html?page=12'
  method: 'GET'
};

// var request = http.request(options, function(res) {

http.request(options, function(res) {
  console.log('status:', res.statusCode);
  console.log('headers:', JSON.stringify(res.headers));
}).on('response', function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('body:', chunk);
  });
}).on('error', function(e) {
  console.log('problem with request:', e.message);
}).end();  // signify that you're done with the request

// write data to request body
// request.write('data\n');
// request.write('data\n');


// convenience method, since most requests are GET requests without bodies

http.get(options, function(res) {
  console.log('got response: ' + res.statusCode);
  console.log('got headers:', JSON.stringify(res.headers));
}).on('error', function(e) {
  console.log('got error:'. e.message);
}).on('response', function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('got body:', chunk);
  });
});
