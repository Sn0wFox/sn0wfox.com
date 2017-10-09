let path    = require('path');
let webpack = require('webpack');

const PROD = process.env.SNFX_BUILD_MODE === 'prod';

/**
 * The following config will be different for dev and prod mode.
 * Everything is based on the environment variable SNFX_BUILD_MODE's value:
 *    - dev             : config for dev mode.
 *    - prod            : config for prod mode.
 *    - <anything else> : default to dev mode.
 */
module.exports = {
  entry: {
    vendor: ['bootstrap'],
    home: './src/home/index.ts',
    portfolio: './src/portfolio/index.ts'
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './build'),
    filename: PROD ? '[name].[hash].js' : '[name].js',
    sourceMapFilename: PROD ? '[name].[hash].map' : '[name].map'
  },

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ path.resolve(__dirname, 'node_modules') ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ],

  devtool: 'source-map',
  
  stats: PROD ? undefined : {
    errorDetails: true
  },

  devServer: PROD ? undefined : {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }

};


// // Our Webpack Defaults
// let defaultConfig = {
//   devtool: 'source-map',
//
//   output: {
//     filename: '[name].bundle.js',
//     sourceMapFilename: '[name].map',
//     chunkFilename: '[id].chunk.js'
//   },
//
//   resolve: {
//     extensions: [ '.ts', '.js' ],
//     modules: [ path.resolve(__dirname, 'node_modules') ]
//   },
//
//   devServer: {
//     historyApiFallback: true,
//     watchOptions: { aggregateTimeout: 300, poll: 1000 },
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//       "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
//     }
//   },
//
//   node: {
//     global: true,
//     crypto: 'empty',
//     __dirname: true,
//     __filename: true,
//     process: true,
//     Buffer: false,
//     clearImmediate: false,
//     setImmediate: false
//   }
// };

