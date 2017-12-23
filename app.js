var path = require('path')
 
var argv = require('yargs').argv;

var testFolder = argv.path;
var fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})