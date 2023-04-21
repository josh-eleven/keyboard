const path = require('path');

const config = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    // eslint-disable-next-line global-require
    rules: require('./webpack.rules'),
  },
  stats: {
    errorDetails: true,
  },
  externals: {
    'node-global-key-listener': 'node-global-key-listener',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      // 'core-js/es': path.resolve(__dirname, 'node_modules/core-js/es')
    }
  },
};

console.log('\n', '😄');
console.log(123123, process.argv)
console.log('⠋ __dirname 😄', __dirname);
// if (process.argv.indexOf('start') !== '-1') {
//   config.externals['node-global-key-listener'] = 'node-global-key-listener'
// }

module.exports = config;
