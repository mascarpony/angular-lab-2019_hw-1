const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      }
    ]
  },
  resolve: {
    extensions: [ '.ts' ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  }
};