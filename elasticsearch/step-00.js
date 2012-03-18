var Step = require('step')
, fs = require('fs');

Step(
  function readSelf() {
    fs.readFile(__filename, this);
  },
  function capitalize(err, text) {
    if (err) throw err;
    return text.toString('utf8').toUpperCase();
    // console.dir(text);
    // return text.toUpperCase();
  },
  function showIt(err, newText) {
    if (err) throw err;
    console.log(newText);
  }
);
