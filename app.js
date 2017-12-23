const path = require('path');

const argv = require('yargs').argv;

let pathToRead = argv.path;
const fs = require('fs');

const regexps = require('./regexps');
const imageTest = regexps.imageTest;

if (path.isAbsolute(pathToRead)) {
  pathToRead = path.relative(__dirname, pathToRead) || './';
};

const readAbsolutePath = function readAbsolutePath (pathToRead) {
  fs.readdir(pathToRead, function (err, files) {
    if (err) {
      throw new Error(err);
    }

    files.forEach(function (file) {
      const absoluteFilePath = path.join(__dirname, pathToRead, file);
      if (imageTest(file)) {
        const stats = fs.statSync(absoluteFilePath);
        console.log(`${absoluteFilePath} : ${stats['size']/1000.0}KB`);
      } else if (fs.lstatSync(absoluteFilePath).isDirectory()) {
        readAbsolutePath(path.join(pathToRead, file));
      }
    });
  })
};

readAbsolutePath(pathToRead);


