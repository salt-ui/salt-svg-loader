# SVG to React Loader [![][tnpm-image]][tnpm-url]

A Webpack Loader to convert SVG into React Component

## Installation

```sh
tnpm install salt-svg-loader
```

##Usage

```js
var React = require('react');
var Icon = require('babel!salt-svg!./my-icon.svg?name=Icon');

module.exports = React.createClass({
    render () {
        return <Icon className='normal' />;
    }
});
```

> Fork [svg2react-loader](https://github.com/yanbingbing/svg2react-loader), and has been reconstructed and optimized.

[tnpm-image]:https://img.shields.io/npm/v/salt-svg-loader.svg?style=flat-square
[tnpm-url]:https://www.npmjs.com/package/salt-svg-loader