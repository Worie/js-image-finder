var imageTest = function (fileNameToTest) {
  var extensionArray = [
    'jpg',
    'png',
    'tiff',
    'rw2',
    'nef',
    'svg',
    'psd',
    'gif',
    'xcf',
    'crw',
    'cr2'
  ];
  
  var regexp = extensionArray
                  .map(el => '\\.'+el)
                  .join('|');
  
  return new RegExp(regexp)
                  .test(fileNameToTest);
};

module.exports = {
  imageTest: imageTest 
};