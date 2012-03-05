var http = require('http'),
  assert = require('assert')

var opts = {
  host: 'localhost',
  port: 8000,
  path: '/send',
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'}
}

var req = http.request(opts, function(res) {
  res.setEncoding('utf8');

  var data = "";
  res.on('data', function(d) {
    data += d;
  });

  res.on('end', function() {
    // console.log(data);
    console.log(res.headers);  // testujemy odpowiedź 'application/json'
    assert.strictEqual(data, '{"status":"ok","message":"Fortune received"}');
  });
});

req.write('fortune=test');
req.end();
