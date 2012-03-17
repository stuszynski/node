var http = require('http');

var options = {
  host: 'localhost'
, port: 9200
, path: '/amazon/_search?pretty=true&q=label:Interscope'
};

http.get(options, function(res) {
  console.log('response: ', res.statusCode);
  console.log('headers:', JSON.stringify(res.headers));
  if (res.statusCode == 200) {
    console.log('success');
  } else {
    console.log('problems');
  };
}).on('error', function(e) {
  console.log('error:'. e.message);
}).on('response', function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('body:', chunk);
  });
});
