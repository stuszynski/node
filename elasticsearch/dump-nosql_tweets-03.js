var http = require('http');

// scroll requests will include a number of hits equal
// to the size multiplied by the number of primary shards.
//   here == 1

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
, path: '/nosql_tweets/_search?search_type=scan&scroll=10m&size=8'  // 8 == best const?
};

var scan_opts = {
  host: 'localhost'
, port: 9200
, path: '/_search/scroll?scroll=10m'
, method: 'POST'
};

var request_1 = scroll(scroll_opts);

request_1.on('error', function(e) {
  console.log('error:'. e.message);
});

request_1.on('response', function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var results = JSON.parse(chunk);
    var scroll_id = results._scroll_id;
    var total = results.hits.total;

    console.warn('scroll_id:', scroll_id);
    console.warn('hits.total:', total);
    console.warn('iterations:', Math.ceil(total / 8));

    // * the “breaking” condition out of a scroll is
    //   when no hits has been returned
    // * the total_hits will be maintained between scroll requests

    for(var i = 0; i < Math.ceil(total / 8); i++) {

      var request_2 = scan(scan_opts);

      request_2.on('error', function(e) {
        console.log('error:'. e.message);
      });

      request_2
        .on('response', function(res) {
          console.warn('SCAN headers:', JSON.stringify(res.headers));

          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            var data = JSON.parse(chunk);
            scroll_id = data._scroll_id;
            console.warn("SCAN scroll_id:", scroll_id);
            console.warn("SCAN size:", data.hits.hits.length);
            data.hits.hits.forEach(function(hit) {
              console.log(JSON.stringify(hit));
            });
          });
        });

      console.warn("SCAN USE scroll_id:", scroll_id);
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
