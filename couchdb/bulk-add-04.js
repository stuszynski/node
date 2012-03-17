var http = require('http');

var options = {
  host: 'localhost',
  port: 5984,
  path: '/xxx/_bulk_docs',
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


var doc = {"docs": [
    {
      "_id": "led-zeppelin-i",
      "type": "album",
      "title": "Led Zeppelin I",
      "released":"1969-01-12",
      "artist": "Led Zeppelin",
      "tracks" : [
         "Good Times Bad Times",
         "Babe I'm Gonna Leave You",
         "You Shook Me",
         "Dazed and Confused",
         "Your Time Is Gonna Come",
         "Black Mountain Side",
         "Communication Breakdown",
         "I Can't Quit You Baby",
         "How Many More Times"
       ]
    },
    {
      "_id": "led-zeppelin-ii",
      "type": "album",
      "title": "Led Zeppelin II",
      "released": "1969-10-22",
      "artist": "Led Zeppelin",
      "tracks" : [
         "Whole Lotta Love",
         "What Is and What Should Never Be",
         "The Lemon Song",
         "Thank You","Heartbreaker",
         "Living Loving Maid (She's Just a Woman)",
         "Ramble On",
         "Moby Dick",
         "Bring It On Home"
         ]
    }
]};

request.write(JSON.stringify(doc));
request.end();
