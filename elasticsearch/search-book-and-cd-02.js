var http = require('http');

var options = {
  host: 'localhost'
, port: 9200
, path: '/amazon/_search?pretty=true'
, method: 'POST'
};

var request = http.request(options, function(res) {
  console.log('status:', res.statusCode);
  console.log('headers:', res.headers);
  if (res.statusCode == 200) {
    console.log('success');
  } else {
    console.log('problems');
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


var query = {
  "query": {
    "query_string": { "query": "Interscope" }
   }
};

// var query = {
//   "query" : {
//     "matchAll" : {}
//   }
// };

request.write(JSON.stringify(query));
request.end();

// dopisać więcej przykładów z:
//   Faceted search, czyli wyszukiwanie fasetowe
