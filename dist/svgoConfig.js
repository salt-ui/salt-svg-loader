'use strict';

module.exports = {
  plugins: [
  // { removeXMLNS: true },
  { removeTitle: true }, { cleanupNumericValues: true }, {
    cleanupIDs: {
      remove: true,
      minify: false,
      force: true
    }
  }, { sortAttrs: true }, { removeStyleElement: true }, { removeScriptElement: true }, { removeDimensions: true }, {
    removeAttrs: {
      attrs: ['class', 'xmlns', 'pointer-events']
    }
  }]
};