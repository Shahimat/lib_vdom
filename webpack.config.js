const path = require('path');
const dotenv = require('dotenv');

const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

module.exports = {
  mode: result.parsed.mode || 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src', 'assets'), to: path.join(__dirname, 'dist') },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    liveReload: true,
    port: 9000,
  },
};