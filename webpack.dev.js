const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: true,
    },
    port: 8081,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
      reconnect: true,
    },
    open: true,
    hot: true,
    watchFiles: ['src/**/*'],
    liveReload: true,
    devMiddleware: {
      writeToDisk: false,
    },
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      // Clear console on server start
      console.clear();
      console.log('Starting development server...');
      return middlewares;
    },
    onListening: (devServer) => {
      console.log('Development server is running at port ' + devServer.server.address().port);
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
