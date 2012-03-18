var http = require('http');

var scroll = function(opts) {
  return http.get(opts, function(res) {
    console.warn('scroll response: ', res.statusCode);
    console.warn('scroll headers:', JSON.stringify(res.headers));

    if (res.statusCode == 200) {
      console.warn('scroll success');
    } else {
      console.warn('scroll problems');
    };
  });
};

var scan = function(opts) {
  return http.request(opts, function(res) {
    console.warn('scan status:', res.statusCode);
    console.warn('scan headers:', res.headers);
    if (res.statusCode == 200) {
      console.warn('scan success');
    } else {
      console.warn('scan problems');
    };
  });
};

var scroll_opts = {
  host: 'localhost'
, port: 9200
, path: '/nosql_tweets/_search?search_type=scan&scroll=10m&size=8'  // 10 == best const?
};

var scan_opts = {
  host: 'localhost'
, port: 9200
, path: '/_search/scroll?scroll=10m'
, method: 'POST'
};

var request_1 = scroll(scroll_opts);

request_1.on('response', function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var results = JSON.parse(chunk);
    var scroll_id = results._scroll_id;
    var total = results.hits.total;

    console.warn('scroll_id:', scroll_id);
    console.warn('hits.total:', total);
    console.warn('iterations:', Math.ceil(total / 8));

    for(var i = 0; i < Math.ceil(total / 8); i++) {
      var request_2 = scan(scan_opts);

      request_2
        .on('response', function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            //console.log(JSON.parse(chunk).hits.hits);
            JSON.parse(chunk).hits.hits.forEach(function(hit) {
              console.log(JSON.stringify(hit));
            });
          });
        });
      request_2.end(scroll_id);
    };

  });
});

var query = {
  "query" : {
    "match_all" : {}
  }
};

request_1.write(JSON.stringify(query));
request_1.end();
