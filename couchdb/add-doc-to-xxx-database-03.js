var http = require('http');

var options = {
  host: 'localhost',
  port: 5984,
  path: '/xxx',
  method: 'POST',                                  // changed
  headers: { "content-type": "application/json" }  // new stuff
};

var request = http.request(options, function(res) {
  console.log('status:', res.statusCode);
  console.log('headers:', res.headers);
  if (res.statusCode == 201) {
    console.log('document successfully added');
  } else {
    console.log('could not add document');
  };
});

request
  .on('error', function(e) {
    console.log('problem with request:', e.message);
  })

request
  .on('response', function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('body:', chunk);
    });
  });


var doc = {"title": "Houses Of The Holy", "released": "March 28, 1973"};
request.write(JSON.stringify(doc));
request.end();
