'use strict';

exports.__esModule = true;

exports.default = function (source) {
  // read our template
  var tmplPath = _path2.default.join(__dirname, '/util/svg.tpl');

  // let webpack know about us, and get our callback
  var callback = this.async();
  this.addDependency(tmplPath);
  this.cacheable();

  // parameters to the loader
  var query = _loaderUtils2.default.parseQuery(this.query);
  var rsrcPath = this.resourcePath;
  var rsrcQuery = _loaderUtils2.default.parseQuery(this.resourceQuery);

  var displayName = rsrcQuery.name || query.name || getName(rsrcPath);

  var render = function render() {
    svgo.optimize(source, function (result) {
      _xml2js2.default.parseString(result.data, {
        attrNameProcessors: [function (name) {
          if (/-/.test(name)) {
            return (0, _toCamelCase2.default)(name);
          }
          return name;
        }]
      }, function (error, xml) {
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
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _template = require('lodash/string/template');

var _template2 = _interopRequireDefault(_template);

var _camelCase = require('lodash/string/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _assign = require('lodash/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _svgo = require('svgo');

var _svgo2 = _interopRequireDefault(_svgo);

var _toCamelCase = require('to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

var _svgoConfig = require('./svgoConfig');

var _svgoConfig2 = _interopRequireDefault(_svgoConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var svgo = new _svgo2.default(_svgoConfig2.default);

var tmpl = void 0;

function readTemplate(callback, filepath) {
  _fs2.default.readFile(filepath, 'utf8', function (error, contents) {
    if (error) {
      throw error;
    }
    tmpl = (0, _template2.default)(contents);
    callback();
  });
}

function getName(filepath) {
  var ext = _path2.default.extname(filepath);
  var basename = _path2.default.basename(filepath, ext);
  return basename[0].toUpperCase() + (0, _camelCase2.default)(basename.slice(1));
}

function renderJsx(displayName, xml, callback) {
  var tagName = (0, _keys2.default)(xml)[0];
  var root = xml[tagName];

  // const props = assign(sanitize(root).$ || {});
  var props = (0, _assign2.default)(root.$ || {});

  delete props.id;

  var xmlBuilder = new _xml2js2.default.Builder({ headless: true });
  var xmlSrc = xmlBuilder.buildObject(xml);

  var component = tmpl({
    displayName,
    defaultProps: props,
    innerXml: xmlSrc.split(/\n/).slice(1, -1).join('\n')
  });
  callback(null, component);
}

/**
 * @param {String} source
 */
module.exports = exports['default'];