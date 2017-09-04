var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /(\.js(x)?|\.svg)$/,
        // node_modules都不需要经过babel解析
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1'].map(function(item) {
            return require.resolve('babel-preset-' + item);
          }),
          plugins: [
            'add-module-exports',
          ].map(function(item) {
            return require.resolve('babel-plugin-' + item);
          }),
          cacheDirectory: true,
          babelrc: false,
        },
      },
      {
        test: /\.svg$/,
        loader: require.resolve('../dist/index'),
      },
    ],
  },
  externals: {
    'react': 'var React', // 相当于把全局的React作为模块的返回 module.exports = React;
    'react-dom': 'var ReactDOM',
    'lodash': 'var _',
  },
  // plugins: [
  //   new BundleAnalyzerPlugin(),
  // ],
  // devServer: {
  //   inline: true,
  // },
};
