var path = require('path')
 
var argv = require('yargs').argv;

var testFolder = argv.path;
var fs = require('fs');

var regexps = require('./regexps');
var imageTest = regexps.imageTest;

fs.readdir(testFolder, function (err, files) {
  if (err) {
    throw err;
  }
  
  files.forEach(function (file) {
    console.log(imageTest(file));
  });
})