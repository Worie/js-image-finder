var path = require('path')
 
var argv = require('yargs').argv;

var pathToRead = argv.path;
var fs = require('fs');

var regexps = require('./regexps');
var imageTest = regexps.imageTest;

if (path.isAbsolute(pathToRead)) {
  pathToRead = path.relative(__dirname, pathToRead) || './';
};

var readAbsolutePath = function readAbsolutePath (pathToRead) {
  fs.readdir(pathToRead, function (err, files) {
    if (err) {
      throw err;
    }

    files.forEach(function (file) {
      var absoluteFilePath = path.join(__dirname, pathToRead, file);
      if (imageTest(file)) {
        console.log(absoluteFilePath);
      } else if (fs.lstatSync(absoluteFilePath).isDirectory()) {
        readAbsolutePath(path.join(pathToRead, file));
      }
    });
  })
};

readAbsolutePath(pathToRead);


