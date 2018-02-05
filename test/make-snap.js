const fs = require('fs-extra');
const path = require('path');
const { invoke, read } = require('./util');

const prefixPath = path.join(__dirname, './svg');
const svgs = fs.readdirSync(prefixPath);

svgs.forEach((svg) => {
  invoke(read(`./svg/${svg}`), {
    callback(error, result) {
      if (error) {
        throw error;
      }
      fs.ensureDir(path.join(__dirname, './snap'));
      fs.writeFileSync(path.join(__dirname, `./snap/${svg}`), result, 'utf-8');
    },
    resourcePath: svg,
  });
});
