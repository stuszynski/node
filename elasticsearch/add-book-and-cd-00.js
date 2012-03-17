var http = require('http');

var options = {
  host: 'localhost'
, port: 9200
, path: '/_bulk'
, method: 'POST'
};

var request = http.request(options, function(res) {
  console.log('status:', res.statusCode);
  console.log('headers:', res.headers);
  if (res.statusCode == 200) {
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


var book = {
  "isbn" : "0812504321",
  "name" : "Call of the Wild",
  "author" : {
     "first_name" : "Jack",
     "last_name" : "London"
   },
   "pages" : 128,
   "tags" : ["fiction", "children"]
};

var cd = {
   "asin" : "B00192IV0O",
   "name" : "THE E.N.D. (Energy Never Dies)",
   "artist" : "Black Eyed Peas",
   "label" : "Interscope",
   "release_date": "2009-06-09",
   "tags" : ["hip-hop", "pop-rap"]
};


// Bulk API:
//   http://www.elasticsearch.org/guide/reference/api/bulk.html

var action_and_meta_1 = JSON.stringify({ "index" : { "_index" : "amazon", "_type" : "book", "_id" : book.isbn }});
var action_and_meta_2 = JSON.stringify({ "index" : { "_index" : "amazon", "_type" : "cd",   "_id" : cd.asin } });

var bulk_data = [action_and_meta_1, JSON.stringify(book), action_and_meta_2, JSON.stringify(cd), ""].join("\n");
request.write(bulk_data);

request.end();

// powyższy kod można nieco skrócić:

// var options = {
//   host: 'localhost'
// , port: 9200
// , path: '/_bulk/amazon'
// , method: 'POST'
// };

// var action_and_meta_1 = JSON.stringify({ "index" : { "_type" : "book", "_id" : book.isbn }});
// var action_and_meta_2 = JSON.stringify({ "index" : { "_type" : "cd",   "_id" : cd.asin } });
