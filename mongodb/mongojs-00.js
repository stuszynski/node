// check on mongodb console:
//
//   db.rock.find({name: "Led Zeppelin"})

// npm install mongojs
//
//   https://github.com/gett/mongojs

var databaseUrl = "test";               // "username:password@localhost:27017/test"
var collections = ["rock", "animals"];

var db = require("mongojs").connect(databaseUrl, collections);

db.rock.find({name: "Led Zeppelin"}, function(err, rock) {

  if( err || !rock)
    console.log("No Led Zeppelin found");
  else rock.forEach( function(lz) {
    console.log(lz.similar);
  });

});

db.animals.save({email: "behemoth@gmail.ru", pass: "ilovemongo", sex: "male"}, function(err, saved) {

  if( err || !saved )
    console.log("---- animal not saved");
  else
    console.log("---> animal saved");

});

db.animals.update({email: "behemoth@gmail.ru"}, {$set: {password: "ireallylovemongo"}}, function(err, updated) {
  if( err || !updated )
    console.log("---- animal not updated");
  else
    console.log("---> animal updated");
});
