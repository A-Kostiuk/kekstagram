const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'docs/js'),
    filename: 'main.bundle.js'
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'nouislider.css',
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
