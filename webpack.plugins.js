// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')


module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CheckerPlugin(),
];
