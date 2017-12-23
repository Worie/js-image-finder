var path = require('path')
// 
var testFolder = './strt/';
var fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})