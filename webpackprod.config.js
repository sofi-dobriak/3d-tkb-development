const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'production',
//   mode: 'development',
  entry: {
    index: './src/assets/s3d/scripts/index-app.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          pure_funcs: [
              'console.log',
              'console.apply',
              // 'console.error',
              // 'console.warn',
              // ...
          ],
        },
        // Make sure symbols under `pure_funcs`,
        // are also under `mangle.reserved` to avoid mangling.
        mangle: {
            reserved: [
                'console.log',
                'console.apply',
                // 'console.error',
                // 'console.warn',
                // ...
            ],
        },
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};

module.exports = config;
