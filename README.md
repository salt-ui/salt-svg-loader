# SVG to React Loader [![][tnpm-image]][tnpm-url]

> A Webpack Loader to turn SVGs into React Components

Fork from: <https://github.com/yanbingbing/svg2react-loader>, and make some change.

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

[tnpm-image]:https://img.shields.io/npm/v/salt-svg-loader.svg?style=flat-square
[tnpm-url]:https://www.npmjs.com/package/salt-svg-loader