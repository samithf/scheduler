// contains configuration data related to production build

const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');
const baseConfig = require('./webpack.base.config.js');

const productionConfig = env => {
  return merge([
    {
      // Set the name of our JS bundle using a chuckhash
      // (e.g. 'app.5124f5efa5436b5b5e7d.js')
      // Location where built files will go.
      output: {
        filename: '[name].[chunkhash].js',
        path: paths.appBuild,
        publicPath: '/'
      },
      optimization: {
        // runtimeChunk: "single",
        minimizer: [
          // Uglify to minify your JavaScript
          new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            exclude: /(node_modules)/,
            cache: true,
            parallel: true,
            uglifyOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
        // splitChunks: {
        //   cacheGroups: {
        //     default: false,
        //     vendors: false,
        //     vendor: {
        //       name: "vendor",
        //       // sync + async chunks
        //       chunks: "all",
        //       // import file path containing node_modules
        //       test: /node_modules/
        //     },
        //     // common chunk
        //     common: {
        //       name: "common",
        //       minChunks: 2,
        //       chunks: "async",
        //       priority: 10,
        //       reuseExistingChunk: true,
        //       enforce: true
        //     }
        //   }
        // }
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new TSLintPlugin({
          files: ['./src/**/*.ts*']
        }),
        new Visualizer({ filename: './statistics.html' })
      ]
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), productionConfig(env));
};
