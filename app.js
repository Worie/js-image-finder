const path = require('path');

const argv = require('yargs').argv;

let pathToRead = argv.path;
const regexp = argv.regexp;

// todo: add json flag
// const regexp = argv.json;

const fs = require('fs');

const regexps = require('./regexps');
const imageTest = regexps.imageTest;
const customTest = regexps.customTest(regexp) || imageTest;

if (!pathToRead){
  throw new Error("No path specified");
}

const finalObject = {
  matches: []
};

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
      if (customTest(file)) {
        const stats = fs.statSync(absoluteFilePath);
        const size = `${stats['size']/1000.0}KB`;
        console.log(`${absoluteFilePath} : ${size}`);
        finalObject.matches.push({
          path: absoluteFilePath,
          size: size
        });
      } else if (fs.lstatSync(absoluteFilePath).isDirectory()) {
        readAbsolutePath(path.join(pathToRead, file));
      }
    });
  });
};

readAbsolutePath(pathToRead);

process.on('exit', () => {
  console.log(JSON.stringify(finalObject));
});

// parametr - filtr 
// console.table 
// saving to file 