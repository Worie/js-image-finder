var path = require('path')
 
var argv = require('yargs').argv;

var testFolder = argv.path;
var fs = require('fs');

var regexps = require('./regexps');
var imageTest = regexps.imageTest;

fs.readdirSync(testFolder).forEach(file => {
  console.log(imageTest(file));
});