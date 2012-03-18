var http = require('http');

var scroll = function(opts) {
  return http.get(opts, function(res) {
    console.warn('response: ', res.statusCode);
    console.warn('headers:', JSON.stringify(res.headers));

    if (res.statusCode == 200) {
      console.warn('success');
    } else {
      console.warn('problems');
    };
  });
};

var scan = function(opts) {
  return http.request(opts, function(res) {
    console.warn('status:', res.statusCode);
    console.warn('headers:', res.headers);
    if (res.statusCode == 200) {
      console.warn('success');
    } else {
      console.warn('problems');
    };
  });
};

var scroll_opts = {
  host: 'localhost'
, port: 9200
, path: '/nosql_tweets/_search?search_type=scan&scroll=10m&size=2'
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
    var scroll_id = JSON.parse(chunk)._scroll_id;
    console.warn('body:', scroll_id);

    for(var i = 0; i < 2; i++) {
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
