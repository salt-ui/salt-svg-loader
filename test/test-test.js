/* globals describe, it*/
const loader = require('../dist/index');
const expect = require('expect.js');
const fs = require('fs');
const path = require('path');
const { invoke, read } = require('./util');

describe('something', () => {
  it('loader should be a function', () => {
    expect(loader).to.be.a('function');
  });

  it('handle normal icon svg', (done) => {
    const filename = './svg/normal.svg';
    invoke(read(filename), {
      callback(error, result) {
        if (error) {
          throw error;
        }
        const snap = fs.readFileSync(path.join(__dirname, './snap/normal.svg'));
        expect(result).to.be.equal(snap.toString());
        done();
      },
      resourcePath: 'normal.svg',
    });
  });
});
