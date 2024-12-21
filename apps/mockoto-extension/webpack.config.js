const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/mockoto-extension'),
    filename: '[name].bundle.js', // Outputs separate bundles for main and background
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main.tsx',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.scss'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json', to: '' }, // Copies manifest.json to the root of the output directory
        { from: './src/background.js', to: '' }, // Copy background.js as-is
      ],
    }),
  ],
};
