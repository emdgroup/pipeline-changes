const path = require('path');
const HTML = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src', 'index.jsx')],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      url: 'url-lite',
      crypto: path.resolve(__dirname, 'src', 'lib', 'crypto'),
    },
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src', 'lib'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'src'),
        enforce: 'pre',
        use: 'source-map-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTML({
      minify: {
        minifyCSS: true,
        minifyJS: true,
        conservativeCollapse: true,
        collapseWhitespace: true,
      },
      filename: 'index.html',
      template: 'index.ejs',
    }),
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
