// collection: animals
//
//   { "name": "Burek", "email": "burasek@psy.pl", "dob": { "$date": 949276800000  } }
//
// docs:
//
//   http://mongoosejs.com/

var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjecId = Schema.ObjecId;

// Important! Mongoose buffers all the commands until it's connected to the database.
// This means that you don't have to wait until it connects to MongoDB
// in order to define models, run queries, etc.

mongoose.connect('mongodb://localhost:27017/test', function(err) {
  if (err) {
    console.log('could not connect to "test" database');
  } else {
    console.log('connected to "test" database');
  };
});

// Model

var AnimalSchema = new Schema({
  name  : { type: String, index: true }
, email : { type: String }
, dob   : { type: Date, default: Date.now }
});

var Animal = mongoose.model('Animals', AnimalSchema);


// CRUD

// var instance = new Animal();
// instance.name = "Burek";
// instance.email = "burasek@psy.pl";

var bazylek = { "name": "Bazylek", "email": "bazylek@koty.pl" }
var instance = new Animal(bazylek);

instance.save(function(err) {
  if (err)
    console.log('animal not saved');
  else
    console.log('animal saved');
});

Animal.find({name: /^B/}, function(err, docs) {
  if (err) {
    ;
  } else {
    console.dir(docs);
  };
});
