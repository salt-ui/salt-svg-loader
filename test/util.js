const loader = require('../dist/index');
const fs = require('fs');
const path = require('path');

const defaultMock = {
  callback(error, result) {
    if (error) {
      throw error;
    }
    console.log(result);
  },
  cacheable() { },
  addDependency() { },
  resourcePath: 'foo.svg',
};

function invoke(xml, mock) {
  const context = Object.assign({}, defaultMock, mock || {});
  context.async = function () { return this.callback; }.bind(context);
  loader.call(context, xml);
}

function read(filepath) {
  return fs.readFileSync(path.join(__dirname, filepath), 'utf8');
}

module.exports = {
  invoke,
  read,
};

