module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  // {
  //   test: /\.([cm]?ts|tsx)$/,
  //   exclude: /(node_modules|\.webpack)/,
  //   use: {
  //     loader: 'ts-loader',
  //     options: {
  //       transpileOnly: true,
  //     },
  //   },
  // },
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: /(node_modules|\.webpack)/,
    enforce: "pre",
    use: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false,
        sourceMaps: true,
        inputSourceMap: true,
        presets: [
          ["@babel/preset-react", { targets: "defaults" }],
          ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: { version: 3 },
            targets: "defaults",
          }],
          ['@babel/preset-typescript']
        ],
        plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-jsx"],
      },
    },
      "ts-loader",
    ],
  }
];
