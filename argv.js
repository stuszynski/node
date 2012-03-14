console.log('PROCESS: argv');

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

console.log('PATH: join, dirname, basename');

var path = require('path');

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
console.log(path.dirname('/foo/bar/baz/asdf/quux'));
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
