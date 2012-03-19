var rest = require('restler')
, Step = require('step');

var scroll_opts = {
  host: 'localhost'
, port: 9200
, path: ''  // 8 == best const?
};

var scroll_id = '';

rest.get('http://localhost:9200/nosql_tweets/_search?search_type=scan&scroll=10m&size=8')
  .on('success', function(result, response) {
    console.warn('SUCCESS');
    console.warn(result);
    console.warn(response.headers);
    //console.log(result._scroll_id);
    scroll_id = result._scroll_id;
  })
  .on('complete', function(result, response) {
    console.warn('COMPLETE');
    console.warn(result);
    console.warn(response.headers);
  });

Step(
  function getScrollId() {
    return scroll_id = '1234abc';
  },
  function dumpAll(err, sid) {
    if (err) throw err;
    console.log('SID:', sid);
    console.log('SCROLL ID:', scroll_id);
  }
);


// var scan_opts = {
//   host: 'localhost'
// , port: 9200
// , path: '/_search/scroll?scroll=10m'
// , method: 'POST'
// };

// request_1.on('response', function(res) {
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     var results = JSON.parse(chunk);
//     var scroll_id = results._scroll_id;
//     var total = results.hits.total;

//     console.warn('scroll_id:', scroll_id);
//     console.warn('hits.total:', total);
//     console.warn('iterations:', Math.ceil(total / 8));

//     // * the “breaking” condition out of a scroll is
//     //   when no hits has been returned
//     // * the total_hits will be maintained between scroll requests

//     for(var i = 0; i < Math.ceil(total / 8); i++) {

//       var request_2 = scan(scan_opts);

//       request_2.on('error', function(e) {
//         console.log('error:'. e.message);
//       });

//       request_2
//         .on('response', function(res) {
//           console.warn('SCAN headers:', JSON.stringify(res.headers));

//           res.setEncoding('utf8');
//           res.on('data', function (chunk) {
//             var data = JSON.parse(chunk);
//             scroll_id = data._scroll_id;
//             console.warn("SCAN scroll_id:", scroll_id);
//             console.warn("SCAN size:", data.hits.hits.length);
//             data.hits.hits.forEach(function(hit) {
//               console.log(JSON.stringify(hit));
//             });
//           });
//         });

//       console.warn("SCAN USE scroll_id:", scroll_id);
//       request_2.end(scroll_id);


//     };

//   });
// });

// var query = {
//   "query" : {
//     "match_all" : {}
//   }
// };

// request_1.write(JSON.stringify(query));
// request_1.end();
