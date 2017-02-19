# SVG to React Loader [![][tnpm-image]][tnpm-url]

> A Webpack Loader to turn SVGs into React Components

Fork from: <https://github.com/yanbingbing/svg2react-loader>, and make some change.

## Installation

```sh
tnpm install @ali/tingle-svg2react-loader
```

##Usage

```js
var React = require('react');
var Icon = require('babel!@ali/tingle-svg2react-loader!./my-icon.svg?name=Icon');

module.exports = React.createClass({
    render () {
        return <Icon className='normal' />;
    }
});
```

[tnpm-image]: http://web.npm.alibaba-inc.com/badge/v/@ali/tingle-svg2react-loader.svg?style=flat-square
[tnpm-url]: http://web.npm.alibaba-inc.com/package/@ali/tingle-svg2react-loader