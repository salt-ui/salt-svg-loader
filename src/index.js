import path from 'path';
import fs from 'fs';
import lutils from 'loader-utils';
import xml2js from 'xml2js';
import template from 'lodash/string/template';
import camelCase from 'lodash/string/camelCase';
import assign from 'lodash/object/assign';
import keys from 'lodash/object/keys';
import SVGO from 'svgo';
// import sanitize from './util/sanitize';

const svgo = new SVGO({
  plugins: [
    // { removeXMLNS: true },
    { removeTitle: true },
    { cleanupNumericValues: true },
    {
      cleanupIDs: {
        remove: true,
        minify: true,
        force: true,
      },
    },
    { sortAttrs: true },
    { removeStyleElement: true },
    { removeScriptElement: true },
    { removeDimensions: true },
    { removeAttrs: 'svg:class' },
  ],
});

let tmpl;

function readTemplate(callback, filepath) {
  fs.readFile(filepath, 'utf8', (error, contents) => {
    if (error) {
      throw error;
    }
    tmpl = template(contents);
    callback();
  });
}


function getName(filepath) {
  const ext = path.extname(filepath);
  const basename = path.basename(filepath, ext);
  return basename[0].toUpperCase() + camelCase(basename.slice(1));
}

function renderJsx(displayName, xml, callback) {
  const tagName = keys(xml)[0];
  const root = xml[tagName];

  // const props = assign(sanitize(root).$ || {});
  const props = assign(root.$ || {});

  delete props.id;

  const xmlBuilder = new xml2js.Builder({ headless: true });
  const xmlSrc = xmlBuilder.buildObject(xml);

  const component = tmpl({
    displayName,
    defaultProps: props,
    innerXml: xmlSrc.split(/\n/).slice(1, -1).join('\n'),
  });

  callback(null, component);
}

/**
 * @param {String} source
 */
export default function (source) {
  // read our template
  const tmplPath = path.join(__dirname, '/util/svg.tpl');

  // let webpack know about us, and get our callback
  const callback = this.async();
  this.addDependency(tmplPath);
  this.cacheable();

  // parameters to the loader
  const query = lutils.parseQuery(this.query);
  const rsrcPath = this.resourcePath;
  const rsrcQuery = lutils.parseQuery(this.resourceQuery);

  const displayName = rsrcQuery.name || query.name || getName(rsrcPath);

  const render = function () {
    svgo.optimize(source, (result) => {
      const xmlParser = new xml2js.Parser();
      xmlParser.parseString(result.data, (error, xml) => {
        if (error) {
          return callback(error);
        }
        return renderJsx(displayName, xml, callback);
      });
    });
  };

  if (tmpl) {
    render();
  } else {
    readTemplate(render, tmplPath);
  }
}
